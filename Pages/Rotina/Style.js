import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262926',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    inputContainer: {
        flex: 1,
        marginTop: 30,
        width: '90%',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    inputTime: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 100,
        fontSize: 20,
        alignItems: 'center'
    },
    button: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'blue',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonCancel: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonTime: {
        marginTop: 5,
        height: 35,
        backgroundColor: 'black',
        paddingHorizontal: 24,
        fontSize: 10,
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: "row"
      },
      buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
      },
    containerListaRotina: {
        flex: 1,
        backgroundColor: '#262926',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleListaRotina: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20
    },
    scrollContainerListaRotina: {
        flex: 1,
        width: '90%'
    },
    itemsContainerListaRotina: {
        marginTop: 10,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    containerRotina: {
        backgroundColor: '#fff',
        marginTop: 20,
        width: '100%'
    },
    buttonsContainerRotina: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButtonRotina: {
        marginLeft: 10,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButtonRotina: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    textItemRotina: {
        fontSize: 20,
    }
  });

  export default styles;