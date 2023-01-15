echo "Switching to main branch"
git checkout main

# echo "------------------------------"
# echo "Logging into Heroku"
# heroku login -i

# echo "------------------------------"
# echo "Deploying server"
# git subtree push --prefix server server main

echo "------------------------------"
echo "Deploying client"
cd client && npm run build
echo '/*    /index.html  200' > build/_redirects
netlify deploy --prod