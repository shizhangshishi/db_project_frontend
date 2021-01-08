let patients1 = [];
for(let i=0;i<30;i++){
    let patient= {
        id: i,
        name: "name" + i,
        region: "mild",
        condition:"mild",
        state:"dead",
    };
    patients1.push(patient);
}

let patients2 = [];
for(let i=0;i<30;i++){
    let patient= {
        id: (i+30),
        name: "name" + (i+30),
        region: "serve",
        condition:"serve",
        state:"cured",
    };
    patients2.push(patient);
}
let patient = {
    id : 1,
    name: 'Qiao Biluo',
    gender: 'female',
    address: 'er xian qiao',
    region: 'critical',
    condition:'serve',
    state:'treated',
    wardNurse: 'cai xu kun',
    wardBed:'1'
};
const PATIENT = patient;
const PATIENTS1 = patients1;
const PATIENTS2 = patients2;
export default {
    PATIENT,
    PATIENTS1,
    PATIENTS2
}