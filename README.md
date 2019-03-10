# Hack on Hills 4 Project

### Instructions

1. Fork the repo.

2. Clone the forked repo using `git clone address_of_forked_repo`

3. Create an upstream using `git remote add upstream address_of_original_repo`

4. Before making any commit in your repo use `git pull upstream master` and `git push origin master`

5. Make the changes you want and use `git add .` and `git commit -m "message"` to commit the changes and `git push origin master`

6. Now open a pull request from website.


### To run the application

1. Dependencies : `Node.js`
2. After installing node.js run : `npm install`
3. Create a file in your root directory : `.env`
4. Place google map api key in this directory : `API_KEY = your_api_key`
5. To run the project : `node app.js`
6. Visit : `localhost:4000`