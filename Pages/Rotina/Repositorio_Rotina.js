import AsyncStorage from '@react-native-async-storage/async-storage';

async function salvarRotina(listaDeRotinas, id){
    listaDeRotinas.id = id ? id : new Date().getTime();
    const rotinasSalvas = await getAll();

    if(id){
        const index = await rotinasSalvas.findIndex(rotina => rotina.id == id);
        rotinasSalvas[index] = listaDeRotinas;
    }
    else
    rotinasSalvas.push(listaDeRotinas);
    
    return AsyncStorage.setItem('rotinas', JSON.stringify(rotinasSalvas));
}

async function getAll(){
    return AsyncStorage.getItem('rotinas')
        .then(response => {
            if(response)
                return Promise.resolve(JSON.parse(response))
            else
                return Promise.resolve([]);
        });
}

async function getRotina(id){
    const rotinasSalvas = await getAll();
    return rotinasSalvas.find(rotina => rotina.id == id);
}

async function deletarRotina(id){
    let rotinasSalvas = await getAll();
    const index = await rotinasSalvas.findIndex(rotina => rotina.id == id);
    rotinasSalvas.splice(index, 1);
    return AsyncStorage.setItem('rotinas', JSON.stringify(rotinasSalvas));
}

module.exports = {
    salvarRotina,
    getAll,
    getRotina,
    deletarRotina
}
