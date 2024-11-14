pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'tourbookingweb' // Tên Docker image cho FE
        DOCKER_TAG = 'latest'           // Tag của Docker image
    }

    stages {
        // Lấy mã nguồn từ GitHub
        stage('Clone Repository') {
            steps {
                git branch: 'master', 
                    url: 'https://github.com/hoangtrungSiscon/Tour-Booking-Web-Client.git', 
                    credentialsId: '3338ef97-97e2-48cf-92d4-b2318012413b'
            }
        }

        // Cài đặt các dependencies của FE
        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install --legacy-peer-deps'
                    } else {
                        bat 'npm install --legacy-peer-deps'
                    }
                }
            }
        }

        // Build project (FE)
        stage('Build Project') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                    }
                }
            }
        }

        // Build Docker image cho FE
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerCmd = "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                    if (isUnix()) {
                        sh dockerCmd
                    } else {
                        bat dockerCmd
                    }
                }
            }
        }

        // Kiểm tra và chạy container
        stage('Run Docker Container') {
            steps {
                script {
                    // Kiểm tra container FE đã chạy chưa
                    def checkContainerCmd = "docker ps -q -f name=tourbookingweb"
                    def containerExists = isUnix() ? sh(script: checkContainerCmd, returnStdout: true).trim() : bat(script: checkContainerCmd, returnStdout: true).trim()

                    if (containerExists) {
                        echo "Container 'tourbookingweb' is already running. Skipping creation."
                    } else {
                        def dockerRunCmd = "docker run -d -p 3000:80 --name tourbookingweb ${DOCKER_IMAGE}:${DOCKER_TAG}"
                        if (isUnix()) {
                            sh dockerRunCmd
                        } else {
                            bat dockerRunCmd
                        }
                    }
                }
            }
        }

        // Refresh Docker Container nếu cần
        stage('Refresh Docker Container') {
            steps {
                script {
                    // Kiểm tra container có tồn tại hay không
                    def checkContainerCmd = "docker ps -a -q -f name=tourbookingweb"
                    def containerExists = isUnix() ? sh(script: checkContainerCmd, returnStdout: true).trim() : bat(script: checkContainerCmd, returnStdout: true).trim()

                    if (containerExists) {
                        echo "Container 'tourbookingweb' found. Stopping and removing the old container."

                        // Dừng và xóa container cũ
                        def stopAndRemoveCmd = "docker stop tourbookingweb && docker rm tourbookingweb"
                        if (isUnix()) {
                            sh stopAndRemoveCmd
                        } else {
                            bat stopAndRemoveCmd
                        }
                    } else {
                        echo "No existing container found for 'tourbookingweb'."
                    }

                    // Khởi động lại container
                    def dockerRunCmd = "docker run -d -p 3000:80 --name tourbookingweb ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    if (isUnix()) {
                        sh dockerRunCmd
                    } else {
                        bat dockerRunCmd
                    }
                }
            }
        }
    }

    // Hành động sau khi pipeline chạy xong
    post {
        success {
            echo 'Frontend Docker Deployment Successful!'
        }
        failure {
            echo 'Frontend Docker Deployment Failed!'
        }
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
