pipeline {
    agent any

    tools {
        nodejs "Node_24"
    }

    environment {
        CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out the code"
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing NPM packages"
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running Cypress tests"
                sh 'npx cypress run'
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo "Generating Allure Report"
                sh 'npx allure generate allure-results --clean -o allure-report'
            }
        }
    }

    post {
        always {
            echo "Publishing Allure Report"
            allure includeProperties: false, jdk: '', reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-results']]
        }
    }
}
