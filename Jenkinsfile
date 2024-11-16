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
                bat 'npm install --legacy-peer-deps'
            }
        }

        // Build project (FE)
        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        // Build Docker image cho FE
        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        // Kiểm tra và chạy container
        stage('Run Docker Container') {
            steps {
                script {
                    // Kiểm tra container FE đã chạy chưa
                    def checkContainerCmd = "docker ps -q -f name=tourbookingweb"
                    def containerExists = bat(script: checkContainerCmd, returnStdout: true).trim()

                    if (!containerExists.isEmpty()) {
                        echo "Container 'tourbookingweb' is already running. Skipping creation."
                    } else {
                        echo "Starting a new container for 'tourbookingweb'."
                        bat "docker run -d -p 3000:80 --name tourbookingweb ${DOCKER_IMAGE}:${DOCKER_TAG}"
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
                    def containerExists = bat(script: checkContainerCmd, returnStdout: true).trim()

                    if (!containerExists.isEmpty()) {
                        echo "Container 'tourbookingweb' found. Stopping and removing the old container."

                        // Dừng và xóa container cũ
                        bat "docker stop tourbookingweb"
                        bat "docker rm tourbookingweb"
                    } else {
                        echo "No existing container found for 'tourbookingweb'."
                    }

                    // Khởi động lại container
                    echo "Starting a new container for 'tourbookingweb'."
                    bat "docker run -d -p 3000:80 --name tourbookingweb ${DOCKER_IMAGE}:${DOCKER_TAG}"
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
}
