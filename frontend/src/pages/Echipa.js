import React from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import imgBck from '../images/cata.jpg'
import '../css/Echipa.css';

export const Echipa = () => {
    return (
        <>
            <div className="container-cards" style={{
                marginTop:"100px",
                display: "flex",
                flexWrap:"wrap",
                justifyContent:"center"
            }}>
                <Card className="cardPiece" style={{
                    width: "35%",
                }}>
                    <Card.Img variant="top" src={imgBck} />
                    <Card.Body>
                        <Card.Title>Catalin Lungu</Card.Title>
                        <Card.Text>
                            Placeholder pentru descriere asociat.</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                    
                <Card className="cardPiece" style={{
                    width: "35%",
                    padding:"0px",
                    marginLeft:"20px",
                    marginRight:"20px",
                }}>
                    <Card.Img variant="top" src={imgBck} />
                    <Card.Body>
                        <Card.Title>Asociat #2</Card.Title>
                        <Card.Text>
                        Placeholder pentru descriere asociat.</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
            </div>
        </>
    )
}