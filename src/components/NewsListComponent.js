import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    FlatList,
    TouchableHighlight,
    StyleSheet,
    Alert
} from 'react-native';
import { colors, padding, fonts } from './_base';
import LoaderComponent from './common/LoaderComponent';
import GoToTopButtonComponent from './common/GoToTopButtonComponent';
import NewsSummaryComponent from './NewsSummaryComponent';

export default class NewsListComponent extends Component {
    flatlistRef = null;
    errorText = null;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            page: props.page || 1,
            pageSize: props.pageSize || 3,
            noMore: props.disableInfiniteScroll || false,
            country: props.country,
            error: {
                message: ''
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.country !== this.props.country) {
            this.setState({
                data: [],
                refreshing: false,
                page: nextProps.page || 1,
                pageSize: nextProps.pageSize || 3,
                noMore: nextProps.disableInfiniteScroll || false,
                country: nextProps.country
            }, () => this.getData());
        }
    }

    getData() {
        const { data, page, pageSize, noMore, country } = this.state;
        const apiKey = '2e7bb23ac4ba434d9b47cdd21b5aa87d';
        // const pageSize = 3;
        // const page = 2;

        this.setState({ loading: true }, () => {
            fetch(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`)
            .then( response => response.json() )
            .then( updatedData => {
                // console.log(updatedData.articles);
                this.setState({
                    // data: updatedData.articles
                    data: [...data, ...updatedData.articles],
                    noMore: noMore || updatedData.length < pageSize*page
                });
                // console.log(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`, 'data', this.state.data);
                // Alert.alert('You are up-to-date', 'News feed refreshed successfully');
            } )
            .catch( error => {
                Alert.alert('Oh snap!', error.message);
                // console.log(error);
                this.setState({ error });
                console.log(this.state.error.message);
            } )
            .finally( () => {
                this.setState({ loading: false, refreshing: false });
                // this.scrollToTop();
            })
        })
    }

    loadMore() {
        const { page, loading, noMore } = this.state;
        if (loading || noMore) return;
        this.setState({ page: page + 1 }, () => this.getData());
    }

    handleRefresh() {
        this.setState({ refreshing: true }, () => {
            this.getData();
            // this.scrollToTop();
        });
        // !this.state.refreshing ? this.scrollToTop() : null;
    }

    scrollToTop() {
        this.flatlistRef.scrollToOffset({y: 0, animated: true});
    }

    render() {
        const { data, loading, error } = this.state; 
        const { onNewsSelect } = this.props;
        return (
            <View>
                {   error.message.length > 1 ?
                    <Text style={styles.errorText}>{ error.message }</Text>: null}
                
                <FlatList
                    ref={ (ref) => this.flatlistRef = ref }
                    data={ data }
                    keyExtractor={ (item, index) => `${index}` }
                    renderItem={ ({item}) => 
                        <TouchableHighlight 
                            underlayColor={ colors.primary }
                            style={ styles.listItem }
                            onPress={ onNewsSelect.bind(this, item) }
                        >
                            <NewsSummaryComponent
                                newsItem={ item }
                            />
                        </TouchableHighlight>
                    }
                    refreshing={ this.state.refreshing }
                    onRefresh={ this.handleRefresh.bind(this) }
                    onEndReachedThreshold={ 0.01 }
                    onEndReached={ this.loadMore.bind(this) }
                    ListFooterComponent={ <LoaderComponent isLoading={ loading } /> }
                />
                <GoToTopButtonComponent
                    onButtonPressed={ this.scrollToTop.bind(this) }
                />
                {/* {   (!loading && data.length) ?
                    <GoToTopButtonComponent
                        onButtonPressed={ this.scrollToTop.bind(this) }
                    /> : null
                } */}
            </View>
        )
    }
}

NewsListComponent.propTypes = {
    // id: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    page: PropTypes.number,
    disableInfiniteScroll: PropTypes.bool,
    onNewsSelect: PropTypes.func,
    country: PropTypes.string,
    error: PropTypes.object
};

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        padding: padding.md,
        backgroundColor: colors.background
    },
    errorText: {
        fontSize: fonts.md,
        fontWeight: 'bold',
        backgroundColor: colors.secondaryBackground,
        marginTop: padding.md,
        borderRadius: 10,
        height: 300,
        width: 300,
        color: colors.normalText,
        paddingTop: '35%',
        paddingLeft: '15%'
    }
});