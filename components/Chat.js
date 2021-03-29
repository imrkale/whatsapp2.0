import React,{useState,useEffect} from 'react'
import {Avatar} from '@material-ui/core'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import {getReceipt} from '../pages/getReceipent'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth,db} from '../firebase'

function Chat({id,users}) {
  
    const [user]=useAuthState(auth);
    const route = useRouter();
    const [email,setEmail]=useState();
    // const getuseremail=(users)=>(
    //     users?.filter(username=>username !== user?.email)[0]
    // )
    const receipentEmail=getReceipt(users);

   
//    const [receipentsnap]=useCollection(db.collection("users").where("email","==",getuseremail(users)));
      db.collection("users").onSnapshot(snapshot=>(
        //   setEmail(snapshot.docs.map(doc=>doc.data().email===getuseremail(users)))
        snapshot.docs.map(doc=>doc.data().email===receipentEmail?setEmail(doc.data().photoURL):"")
      ))
//    const [receipentsnap]=db.collection("users").where("email","==",getuseremail(users)).get();
//    const receipent = email?.docs?.[0]?.data();
        
   console.log(email);
    return (
        <Container onClick={()=>route.push(`chat/${id}`)}>
            {
                email?(
                    <UserAvatar src={email}/>   
                ):(
                    <UserAvatar>{receipentEmail[0]}</UserAvatar>
                )
            }
           
            <p>{receipentEmail}</p>
        </Container>
    )
}

export default Chat

const Container=styled.div`
    display:flex;
    align-items:center;
    cursor:pointer;
    padding:15px;
    word-wrap:break-word;

    :hover{
        background-color:#e9eaeb;
    }
`;

const UserAvatar=styled(Avatar)`
    margin:5px;
    margin-right:15px;
`;