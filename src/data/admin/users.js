let users = []
for(let i=0;i<30;i++){
    let user1 = {
        id: i,
        username: "user_allocated" + i,
        gender: "male",
        medic: {
            profession: "doctor",
            id:i
        }
    };
    let user2 = {
        id: i+30,
        username: "user_not_allocated" + i,
        gender: "male",
        medic: {}
    };
    users.push(user1);
    users.push(user2);
}
const USERS = users;
export default {
    USERS
}