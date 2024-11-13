pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/hoangtrungSiscon/Tour-Booking-Web-Client.git'
            }
        }
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
        stage('Run Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Thêm lệnh triển khai tại đây
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Build and deployment successful!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
