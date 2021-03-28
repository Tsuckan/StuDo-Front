# StuDo-Front

| Master build status | Develop build status |
| ------------------- | -------------------- |
| [![Build Status](https://dev.azure.com/rtuitlab/RTU%20IT%20Lab/_apis/build/status/StuDo/StuDo-Front?branchName=master)](https://dev.azure.com/rtuitlab/RTU%20IT%20Lab/_build/latest?definitionId=95&branchName=master) | [![Build Status](https://dev.azure.com/rtuitlab/RTU%20IT%20Lab/_apis/build/status/StuDo/StuDo-Front?branchName=develop)](https://dev.azure.com/rtuitlab/RTU%20IT%20Lab/_build/latest?definitionId=95&branchName=develop) |

## How to start
- Run `npm install`. It will install all the dependencies in "node_modules" folder.
- Create "./.env" file. Fill it with the following:
    ```
    NODE_ENV=production
    VUE_APP_API=http://localhost:5301/api/
    VUE_APP_FRONT=http://localhost:5302/
    ```
- Use `npm start` to start app