import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Label, Row, Col, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger} from 'react-animation-components';

function RenderDish({dish}) {
    if (dish.image != null && dish.name != null && dish.description != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <FadeTransform in 
                    transformProps = {{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg src={baseUrl + dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>

            </div>
        );
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function RenderComments({comments,postComment,dishId}) {

    if (comments != null) {
        return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className = "list-group">
                        <Stagger in>
                            {comments.map((comment) => {
                                return (
                                    <Fade in>
                                        <li key={comment.id} className="list-group-item border-0">
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </p>
                                        </li>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    </ul>                    
                    <CommentForm postComment={postComment} dishId={dishId}/>
                </div>
        );
    } else {
        return (
            <div><p>No comments for this dish</p></div>
        );
    }
}


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    submitComment(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.message);
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.submitComment(values)}>
                            <Row className="form-group">
                                <Label className="comment-label" htmlFor="rating"><strong>Rating</strong></Label>
                                <Col>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label className="comment-label" htmlFor="name"><strong>Name</strong></Label>
                                <Col>
                                    <Control.text model=".name" id="name" name="name" placeholder="Name" className="form-control" validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}/>
                                    <Errors className="text-danger" model=".name" show="touched" messages={{required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less'}} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label className="comment-label" htmlFor="message"><strong>Comment</strong></Label>
                                <Col>
                                    <Control.textarea model=".message" id="message" name="message" placeholder="Write something here..." rows="6" className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" id="comment-button" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

const DishDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null) {
        return (
            <div class="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div class="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
                </div>
            </div>  
        );
    } else {
        return (
            <div></div>
        );
    }
}


export default DishDetail;