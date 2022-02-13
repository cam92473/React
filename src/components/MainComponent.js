
import React, { Component } from 'react';
import Menu from './MenuComponent.js';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Home from './HomeComponent.js';
import { Routes, Route, Navigate, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Contact from './ContactComponent.js';
import { useParams } from 'react-router-dom';
import DishDetail from './DishdetailComponent.js';
import About from './AboutComponent.js';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }        
}


class Main extends Component {
  
  constructor(props) {
        super(props);
    }

    render() {

        const DishdetailWrapper = () => {
            const {dishIdUrl} = useParams();
            const matching_dish = this.props.dishes.find((dish) => dish.id === parseInt(dishIdUrl,10));
            const matching_comments = this.props.comments.filter((comment) => comment.dishId === parseInt(dishIdUrl,10));
            return(
            <DishDetail dish={matching_dish} comments={matching_comments}/>
            );
        };

        return (
            <div>
                <Header />
                <Routes>
                    <Route path="/home" element={<Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} leader={this.props.leaders.filter((leader) => leader.featured)[0]} promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]} />} />
                    <Route path="/menu" element={<Menu dishes={this.props.dishes}/>} />
                    <Route path="/menu/:dishIdUrl" element={<DishdetailWrapper/>} />
                    <Route path="/aboutus" element={<About leaders={this.props.leaders}/>} />
                    <Route path="/contactus" element={<Contact/>} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Main);