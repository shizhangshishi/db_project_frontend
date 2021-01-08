let wardNurses = [];
for(let i=0;i<30;i++){
    let wardNurse= {
        id: i,
        name: "ward_nurse_r" + i,
        username:"ward_nurse_u"+i,
        region:"critical",
        patients:[
            {
                id:i,
                name:"patient"+i+"_1"
            },
            {
                id:i,
                name:"patient"+i+"_2"
            },
            {
                id:i,
                name:"patient"+i+"_3"
            }
        ]
    };
    wardNurses.push(wardNurse);
}

const WARD_NURSE = wardNurses;
export default {
    WARD_NURSE
}