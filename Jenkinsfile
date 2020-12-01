projectName = "progressive-weather"

podTemplate(
  name: projectName,
  label: projectName,
  namespace: "jenkins-build",
  yaml: """
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: jenkins-slave
spec:
  containers:
  - name: builder
    image: ermusthofa/srdosb-builder:1.0.0
    command:
    - cat
    tty: true
    privileged: true
    volumeMounts:
    - name: dockersock
      mountPath: /var/run/docker.sock
  - name: aws-cli
    image: amazon/aws-cli
    command:
    - cat
    tty: true
    privileged: true
  - name: ansible
    image: cytopia/ansible:2.8-aws
    command:
    - cat
    tty: true
    privileged: true
  volumes:
  - name: dockersock
    hostPath:
      path: /var/run/docker.sock
"""
) {

  node(projectName) {
    stage("Checkout SCM") {
      checkout scm
    }

    stage("Preparation") {
      config = readJSON file: "progressive-weather-app/jenkins-config.json"
      version = readJSON file: "progressive-weather-app/version.json"
    }

    stage("Build") {
      container("builder") {

        config.build.env_vars.each() {
          env."${it.key}" = "${it.value}"
        }

        build_version = version.version

        sh """
          export VERSION=${BRANCH_NAME}-${build_version}
          
          cd ${WORKSPACE}/progressive-weather-app
          make build
        """
      }
    }

    stage("Extract Artifact") {
      container("builder") {

        config.build.env_vars.each() {
          env."${it.key}" = "${it.value}"
        }

        build_version = version.version

        sh """
          export VERSION=${BRANCH_NAME}-${build_version}

          cd ${WORKSPACE}/progressive-weather-app
          make run
        """
      }
    }

    try {
      withCredentials([
        string(credentialsId: 'AWS_ACCESS_KEY', variable: 'AWS_ACCESS_KEY_ID'),
        string(credentialsId: 'AWS_SECRET_KEY', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {

        stage("Push Artifact") {
          container("aws-cli") {

            config.build.env_vars.each() {
              env."${it.key}" = "${it.value}"
            }
            
            sh """

              cd ${WORKSPACE}/progressive-weather-app
              aws s3 sync artifacts s3://${VUE_AWS_BUCKET}
            """
      
          }
        }

      }
    } catch (e) {
      currentBuild.result = "UNSTABLE"
      echo "Please make sure your aws creds is valid"
    }

    withCredentials([
        string(credentialsId: 'DOCKER_HUB_USERNAME', variable: 'DOCKER_HUB_USERNAME'),
        string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')
        ]) {

      stage('Push Docker Image') {
        container("builder") {

          config.build.env_vars.each() {
            env."${it.key}" = "${it.value}"
          }

          build_version = version.version

          sh """
            docker login --username ${DOCKER_HUB_USERNAME} --password ${DOCKER_HUB_PASSWORD}

            docker tag srdosb:${BRANCH_NAME}-${build_version} srdosb/srdosb:${BRANCH_NAME}-${build_version}
            docker push srdosb/srdosb:${BRANCH_NAME}-${build_version}
          """
        }
      }

    }

    withCredentials([
        string(credentialsId: 'AWS_ACCESS_KEY', variable: 'AWS_ACCESS_KEY_ID'),
        string(credentialsId: 'AWS_SECRET_KEY', variable: 'AWS_SECRET_ACCESS_KEY'),
        string(credentialsId: 'TARGET_VM_PRIVATE_KEY', variable: 'TARGET_VM_PRIVATE_KEY')
        ]) {

      stage('Deploy to VM') {
        container("ansible") {

          config.build.env_vars.each() {
            env."${it.key}" = "${it.value}"
          }

          build_version = version.version

          sh """

            export ANSIBLE_CONFIG="${WORKSPACE}/ansible/aws.cfg"

            cd ${WORKSPACE}/ansible
            sed -i 's#aws_access_key: will_be_replaced#aws_access_key: '"${AWS_ACCESS_KEY_ID}"'#g' ansible_plugins/srdosb_aws_ec2.yaml
            sed -i 's#aws_secret_key: will_be_replaced#aws_secret_key: '"${AWS_SECRET_ACCESS_KEY}"'#g' ansible_plugins/srdosb_aws_ec2.yaml

            echo ${TARGET_VM_PRIVATE_KEY} | base64 -d - > private.pem
            chmod 400 private.pem

            ansible-playbook -e "passed_in_hosts=application_weather" -e "build_version=${BRANCH_NAME}-${build_version}" deploy-progressive-weather.yaml
          """
        }
      }

    }

  }

}
