async function getUserActivity(username){
    try{
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        const result = await response.json();

        if(!response.ok){
            if(response.status === 404) console.log("User not found. Please enter a valid username");
            else console.log("Error occured while trying to fetch user's activity. Maybe the user doesn't have any recent acitivity");
        }
        else{
            result.forEach((act) => {
                switch (act.type) {
                    case "PushEvent":
                        console.log(`- Pushed to ${act.repo.name}`);
                        break;
                                
                    case "WatchEvent":
                        console.log(`- Starred ${act.repo.name}`);
                        break;
                                
                    case "ForkEvent":
                        console.log(`- Forked ${act.repo.name}`);
                        break;
                                
                    case "CreateEvent":
                        console.log(`- Created ${act.payload.ref_type} in ${act.repo.name}`);
                        break;
                                
                    case "IssuesEvent":
                        console.log(`- ${act.payload.action} an issue in ${act.repo.name}`);
                        break;
                                
                    case "PullRequestEvent":
                        console.log(`- ${act.payload.action} a pull request in ${act.repo.name}`);
                        break;

                    case "DeleteEvent":
                        console.log(`- Deleted a ${act.payload.ref_type} in ${act.repo.name}`);
                    
                    case "DiscussionEvent":
                        console.log(`Discussion created `)
                                
                    default:
                        console.log(`- ${act.type} in ${act.repo.name}`);
                }
            });
        }
    }
    catch(error){
        console.log("Error occured");
    }
}
const username = process.argv[2];
getUserActivity(username);