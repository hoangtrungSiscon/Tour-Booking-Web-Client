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
                bat 'npm install --force'
            }
        }
        // Cài đặt Angular CLI
        stage('Install Angular CLI') {
            steps {
                bat 'npm install -g @angular/cli'
            }
        }
        // Chạy các bài kiểm tra
        stage('Run Tests') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        bat 'node -v' // Kiểm tra phiên bản Node.js
                        bat 'npx ng test --watch=false --code-coverage'
                    }
                }
            }
        }

        // Chạy Cypress Tests
        stage('Run Cypress Tests') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        bat 'npx cypress run --config-file cypress.config.ts'
                    }
                }
            }
        }

        // Build project (FE)
        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        // Build Docker image cho FE
        // stage('Build Docker Image') {
        //     steps {
        //         script {
        //             bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
        //         }
        //     }
        // }
      stage('Build Docker Image') {
          steps {
              script {
                  // Clear cache before build
                  bat "docker system prune -f"
      
                  // Build Docker image with network optimizations
                  bat "docker build --no-cache --network=host -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
              }
          }
      }


        // Kiểm tra và chạy container
        stage('Run Docker Container') {
            steps {
                script {
                    def checkContainerCmd = "docker ps -q -f name=tourbookingweb"
                    def containerExists = bat(script: checkContainerCmd, returnStdout: true).trim()

                    if (containerExists) {
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
                    def checkContainerCmd = "docker ps -a -q -f name=tourbookingweb"
                    def containerExists = bat(script: checkContainerCmd, returnStdout: true).trim()

                    if (containerExists) {
                        echo "Container 'tourbookingweb' found. Restarting the old container."
                        bat "docker container restart tourbookingweb"
                    } else {
                        echo "No existing container found for 'tourbookingweb'."
                        echo "Starting a new container for 'tourbookingweb'."
                        bat "docker run -d -p 3000:80 --name tourbookingweb ${DOCKER_IMAGE}:${DOCKER_TAG}"
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