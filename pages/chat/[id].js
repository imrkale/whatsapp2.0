import Head from "next/head";
import styled from 'styled-components'
import Sidebar from "../../components/Sidebar";
import {auth,db} from '../../firebase'
import {getReceipt} from '../getReceipent'
import ChatScreen from "../../components/ChatScreen";
import {useAuthState} from 'react-firebase-hooks/auth'

function Chat({mesages,chat})
{
    const [user]=useAuthState(auth);
    const receipentEmail=getReceipt(chat.users);
    return (
        <Container>
            <Head>
                <title>Chat</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <h1>Chat with {receipentEmail}</h1>
                <ChatScreen/>
            </ChatContainer>
        </Container>
    )
}

export default Chat;

export async function getServerSideProps(context)
{
    console.log(context.query.id);
    const ref=db.collection('chats').doc(context.query.id);
    const messageRes=await ref.collection('messages').orderBy('timestamp','asc').get(); 
    const messages =messageRes.docs.map((doc) => ({
        id:doc.id,
        ...doc.data()
    })).map((messages) =>({
        ...messages,
        timestamp:messages.timestamp.toDate().getTime(),
    }));

    const chatRes= await ref.get();
    const chat={
        id:chatRes.id,
        ...chatRes.data(),
    }
    console.log(chat);
    return {
        props:{
            messages:JSON.stringify(messages),
            chat:chat,
        }
    }
}

const Container=styled.div`
    display:flex;
`;
const ChatContainer=styled.div`
    flex:1;
    overflow:scroll;
    height:100vh;

    ::-webkit-scrollbar{
        display:none;
    }
    /* Edge */
    --ms-overflow-style:none;
    /* Firefox */
    scrollbar-width:none;
`;