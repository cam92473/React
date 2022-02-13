import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

function RenderDish({dish}) {
    if (dish.image != null && dish.name != null && dish.description != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

function RenderComments({comments}) {
    if (comments != null) {

        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <h4>Comments</h4>
                    <ul className = "list-group">
                        <li className="list-group-item border-0">{comments[0].comment}</li>
                        <li className="list-group-item border-0">-- {comments[0].author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments[0].date)))} </li>
                        <li className="list-group-item border-0">{comments[1].comment}</li>
                        <li className="list-group-item border-0">-- {comments[1].author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments[1].date)))} </li>
                        <li className="list-group-item border-0">{comments[2].comment}</li>
                        <li className="list-group-item border-0">-- {comments[2].author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments[2].date)))} </li>
                        <li className="list-group-item border-0">{comments[3].comment}</li>
                        <li className="list-group-item border-0">-- {comments[3].author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments[3].date)))} </li>
                    </ul>
                </Card>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}

const DishDetail = (props) => {

    if (props.dish != null) {

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
                    <RenderComments comments={props.comments} />
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