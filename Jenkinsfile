pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'tourbookingweb' // Docker image name for FE
        DOCKER_TAG = 'latest'           // Docker image tag
    }

    stages {
        // Clone the repository from GitHub
        stage('Clone Repository') {
            steps {
                git branch: 'master', 
                    url: 'https://github.com/hoangtrungSiscon/Tour-Booking-Web-Client.git', 
                    credentialsId: '3338ef97-97e2-48cf-92d4-b2318012413b'
            }
        }

        // Install dependencies for FE
        stage('Install Dependencies') {
            steps {
                bat 'npm install --force'
            }
        }

        // Install Angular CLI
        stage('Install Angular CLI') {
            steps {
                bat 'npm install -g @angular/cli'
            }
        }

        // Run unit tests
        stage('Run Tests') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        bat 'node -v' // Check Node.js version
                        bat 'npx ng test --watch=false --code-coverage'
                    }
                }
            }
        }

        // Run Cypress tests
        stage('Run Cypress Tests') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        bat 'npx cypress run --config-file cypress.config.ts'
                    }
                }
            }
        }

        // Build the frontend project
        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        // Build Docker image for FE
        stage('Build Docker Image') {
            steps {
                script {
                    // Clear cache before building
                    bat "docker system prune -f"
                    
                    // Build Docker image
                    bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        // Run or refresh Docker container
        stage('Run or Refresh Docker Container') {
            steps {
                script {
                    // Check if the container exists (running or stopped)
                    def checkContainerCmd = "docker ps -a -q -f name=tourbookingweb"
                    def containerId = bat(script: checkContainerCmd, returnStdout: true).trim()

                    echo "Container Check Result: ${containerId}"

                    if (containerId) {
                        echo "Container 'tourbookingweb' found. Stopping and removing the old container."
                        bat "docker stop ${containerId}"
                        bat "docker rm ${containerId}"
                    } else {
                        echo "No existing container for 'tourbookingweb'."
                    }

                    // Run the Docker container
                    echo "Starting a new container for 'tourbookingweb'."
                    bat "docker run -d -p 3000:80 --name tourbookingweb ${DOCKER_IMAGE}:${DOCKER_TAG}"

                    // Verify the container was created successfully
                    def verifyContainerCmd = "docker ps -a -q -f name=tourbookingweb"
                    def newContainerId = bat(script: verifyContainerCmd, returnStdout: true).trim()
                    echo "New Container ID: ${newContainerId}"
                    if (!newContainerId) {
                        error("Failed to create the Docker container for 'tourbookingweb'.")
                    }
                }
            }
        }
    }

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
