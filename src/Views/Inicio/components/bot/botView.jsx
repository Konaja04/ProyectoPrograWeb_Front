import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Typography, TextField, Button, Link as MuiLink, IconButton } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';

const initialMessages = [];

const BotView = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const enviarMensaje = async () => {
        const mensaje = {
            text: inputText,
            user_name: "Kohji"
        };
        const response = await fetch("http://127.0.0.1:8000/bot/mensaje", {
            method: "post",
            body: JSON.stringify(mensaje)
        });
        const data = await response.json();
        console.log(data);
        data.forEach(mensaje => {
            const newMessage = { author: 'bot', text: mensaje.body };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
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
        <Container width="300px">
            <Box height="500px" overflow="auto" mb={2} p={2}>
                {messages.map((message, index) => (
                    <Message key={index} author={message.author} text={message.text} />
                ))}
                <div ref={messagesEndRef} />
            </Box>
            <Box display="flex" alignItems="center">
                <TextField
                    label="Escribe un mensaje..."
                    variant="outlined"
                    fullWidth
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyPress={(event) => event.key === 'Enter' && handleSendMessage()}
                />
                <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
                    Enviar
                </Button>
            </Box>
        </Container>
    );
};

const Message = ({ author, text }) => {

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
                                <LinkIcon />{text.substring(30,)}
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
            mb={1}
            borderRadius={5}
            width="60%"
            bgcolor={author === 'bot' ? 'primary.main' : 'info.light'}
            color={author === 'bot' ? 'primary.contrastText' : 'textPrimary'}
            boxShadow={3}
            sx={{
                marginLeft: author === 'bot' ? '0%' : 'auto',
                marginRight: author === 'bot' ? 'auto' : '0%',
                wordWrap: 'break-word',
                textAlign: 'left',
            }}
        >
            <Typography variant="body1" component="div" style={{ fontSize: '1rem' }}>
                {renderTextWithLinks(text)}
            </Typography>
        </Box>
    );
};

export default BotView;
