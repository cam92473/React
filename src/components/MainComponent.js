
import React, { Component } from 'react';
import Menu from './MenuComponent.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Home from './HomeComponent.js';
import { Routes, Route, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import Contact from './ContactComponent.js';
import { useParams } from 'react-router-dom';
import DishDetail from './DishdetailComponent.js';
import About from './AboutComponent.js';
import {postComment, fetchDishes, fetchComments, fetchPromos} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    }        
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())}
});

class Main extends Component {
  
  constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {

        const DishdetailWrapper = () => {
            const {dishIdUrl} = useParams();
            const matching_dish = this.props.dishes.dishes.find((dish) => dish.id === parseInt(dishIdUrl,10));
            const matching_comments = this.props.comments.comments.filter((comment) => comment.dishId === parseInt(dishIdUrl,10));
            return(
            <DishDetail dish={matching_dish} 
                comments={matching_comments} 
                postComment={this.props.postComment} 
                isLoading={this.props.dishes.isLoading} 
                errMess={this.props.dishes.errMess}
                commentsErrMess={this.props.comments.errMess} />
            );
        };

        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={<Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
                        dishesLoading={this.props.dishes.isLoading} 
                        dishesErrMess={this.props.dishes.errMess} 
                        promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                        promosLoading={this.props.promotions.isLoading} 
                        promosErrMess={this.props.promotions.errMess} 
                        leader={this.props.leaders.filter((leader) => leader.featured)[0]} />} />
                    <Route path="/menu" element={<Menu dishes={this.props.dishes}/>} />
                    <Route path="/menu/:dishIdUrl" element={<DishdetailWrapper/>} />
                    <Route path="/aboutus" element={<About leaders={this.props.leaders}/>} />
                    <Route path="/contactus" element={<Contact resetFeedbackForm = {this.props.resetFeedbackForm} />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);