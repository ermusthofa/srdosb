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
    }

    stage("Build") {
      container("builder") {

        config.build.env_vars.each() {
          env."${it.key}" = "${it.value}"
        }

        sh """
          export NODE_ENV=${NODE_ENV}
          
          cd progressive-weather-app
          make build
        """
      }
    }

    stage('Push ECR & Tagging') {
      sh """
        echo push
      """
    }
  }

}