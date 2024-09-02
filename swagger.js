import * as dotenv from 'dotenv'
dotenv.config()
import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
        version: "1.0.0",
        title: "Api Agrisoft",
        description: ""
    },
    host: "52.23.209.121:" + process.env.PORT,
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'X-API-KEY',
            description: 'api agrisoft'
        }
    },
    
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Documentacion Generada.");
})