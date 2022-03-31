import AsyncStorage from '@react-native-async-storage/async-storage';

async function salvarRotina(listaDeAfazeres, id){
    listaDeAfazeres.id = id ? id : new Date().getTime();
    const afazeresSalvos = await getAll();

    if(id){
        const index = await afazeresSalvos.findIndex(afazer => afazer.id == id);
        afazeresSalvos[index] = listaDeAfazeres;
    }
    else
    afazeresSalvos.push(listaDeAfazeres);
    
    return AsyncStorage.setItem('afazeres', JSON.stringify(afazeresSalvos));
}

async function getAll(){
    return AsyncStorage.getItem('afazeres')
        .then(response => {
            if(response)
                return Promise.resolve(JSON.parse(response))
            else
                return Promise.resolve([]);
        });
}

async function getRotina(id){
    const afazeresSalvos = await getAll();
    return afazeresSalvos.find(afazer => afazer.id == id);
}

async function deletarRotina(id){
    let afazeresSalvos = await getAll();
    const index = await afazeresSalvos.findIndex(afazer => afazer.id == id);
    afazeresSalvos.splice(index, 1);
    return AsyncStorage.setItem('afazeres', JSON.stringify(afazeresSalvos));
}

module.exports = {
    salvarRotina,
    getAll,
    getRotina,
    deletarRotina
}
