import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography, TextField, Button, Link as MuiLink, IconButton, Avatar } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import SendIcon from '@mui/icons-material/Send';

const initialMessages = [];

const BotView = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const storedMessages = localStorage.getItem("MENSAJES");
        if (storedMessages !== null) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);


    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const enviarMensaje = async () => {
        setIsSendingMessage(true);
        setIsTyping(true);


        await new Promise(resolve => setTimeout(resolve, 500));

        const mensaje = {
            text: inputText,
            user_name: localStorage.getItem("NOMBRE")
        };
        const response = await fetch("https://backend-salas-ulima-20211628.azurewebsites.net/bot/mensaje", {
            method: "post",
            body: JSON.stringify(mensaje)
        });
        const data = await response.json();
        setIsTyping(false);
        setIsSendingMessage(false);
        data.forEach(mensaje => {
            const newMessage = { author: 'bot', text: mensaje.body };
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }, 500);
        });
        localStorage.setItem("MENSAJES", JSON.stringify(messages));
    };

    const handleSendMessage = () => {

        if (inputText.trim() !== '') {
            const userMessage = { author: 'user', text: inputText };
            setMessages([...messages, userMessage]);
            enviarMensaje(inputText);
            setInputText('');
        }
    };

    return (
        <Container style={{ padding: 0, borderRadius: "40px" }}>


            <Box
                height="110px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}

            >
                <Avatar src="https://th.bing.com/th/id/R.3c231f5962d9921a2994ffee2b1d09bb?rik=ucqVj9EiHGohYw&riu=http%3a%2f%2fwww.ofuxico.com.br%2fimg%2fupload%2fnoticias%2f2012%2f08%2f09%2f146109_36.jpg&ehk=9LKFBLd1n1Lt6CG3Gn%2fwee9GJsCwfVaMlJtSyyKIbkY%3d&risl=&pid=ImgRaw&r=0"
                    style={{ marginLeft: "15px", width: '70px', height: '70px' }} />
                <h4 className='bot-name'> ChatYanne</h4>
            </Box>


            <Box
                paddingTop={2}
                height="580px"
                width="470px"
                bgcolor="#f0f0f0"
                overflow="auto"
            >
                {messages.map((message, index) => (
                    <Message key={index} author={message.author} text={message.text} isTyping={isTyping} />

                ))}
                {isSendingMessage && (
                    <Box
                        p={2}
                        margin={2}
                        borderRadius="22px"
                        borderBottomLeftRadius="5px"
                        width="fit-content"
                        bgcolor="white">

                        <Typography style={{ fontSize: '1rem' }}>Escribiendo...</Typography>
                    </Box>
                )}
                <div ref={messagesEndRef} />
            </Box>


            <Box p={2} display="flex" alignItems="center" width="100%">
                <TextField
                    label="Escribe tu mensaje aquí"
                    variant="standard"
                    fullWidth
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyPress={(event) => event.key === 'Enter' && handleSendMessage()}
                    sx={{
                        marginBottom: "10px",
                        borderBottom: 'none',
                        '& .MuiInput-underline:before': {
                            borderBottom: 'none',
                        },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottom: 'none',
                        },
                    }}
                />
                <IconButton
                    style={{ color: inputText.trim() === '' ? 'grey' : '#FA7525' }}
                    onClick={handleSendMessage}
                    disabled={inputText.trim() === ''}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Container>
    );
};

const Message = ({ author, text, isTyping }) => {
    const renderTextWithLinks = (text) => {
        if (typeof text !== 'string') {
            text = text.toString()
        }

        const urlRegex = /(\bhttps?:\/\/\S+)/ig;
        return text.split(' ').map((word, index) => {
            if (urlRegex.test(word)) {
                const displayText = typeof word === 'string' ? word.substring(0, Math.min(word.length, 30)) : '';
                return (
                    <span key={index}>
                        Para más información:
                        <MuiLink href={word} target="_blank" rel="noopener noreferrer">
                            <IconButton size="small" color="secondary" style={{ padding: 0, marginLeft: 4, verticalAlign: 'bottom' }}>
                                <LinkIcon />{text.substring(61,)}
                            </IconButton>
                        </MuiLink>
                    </span>
                );
            }
            return <span key={index}>{word} </span>;
        });
    };

    return (
        <Box
            p={2}
            margin={2}
            borderRadius="40px"
            width="fit-content"
            bgcolor={author === 'bot' ? 'primary.main' : 'info.light'}
            sx={{
                wordWrap: 'break-word',
                textAlign: author === 'user' ? 'right' : 'left',
                marginLeft: author === 'user' ? 'auto' : '15px',
                borderTopLeftRadius: '22px',
                borderTopRightRadius: '22px',
                borderBottomLeftRadius: author === 'user' ? '22px' : '5px',
                borderBottomRightRadius: author === 'user' ? '5px' : '22px',
                color: author === 'user' ? 'white' : 'black',
                backgroundColor: author === 'user' ? '#FA7525' : 'white',
                position: 'relative',
            }}
        >
            <Typography style={{ fontSize: '1rem' }}>
                {renderTextWithLinks(text)}
            </Typography>
        </Box>
    );
};
export default BotView;
