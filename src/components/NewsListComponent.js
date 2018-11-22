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
    newsFeedData = require('../data/newsFeed.json');

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refreshing: false,
            manualRefresh: false,
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
        const { data, page, pageSize, noMore, country, manualRefresh } = this.state;
        const apiKey = '2e7bb23ac4ba434d9b47cdd21b5aa87d';

        this.setState({
            loading: true,
            error: {
                message: ''
            }
        }, () => {
            fetch(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`)
            .then( response => response.json() )
            .then( updatedData => {
                // console.log(updatedData);
                this.setState({
                    // data: updatedData
                    data: [...data, ...updatedData.articles],
                    noMore: noMore || updatedData.length < pageSize*page
                }, () => {
                    if(manualRefresh) {
                        this.scrollToTop();
                        this.setState({manualRefresh: false});
                    }
                });
            } )
            .catch( error => {
                if(!data.length) {
                    this.setState({ error });
                }
            } )
            .finally( () => {
                this.setState({ loading: false, refreshing: false });
            })
        });

        // this.showFakeData();
    }

    showFakeData() {
        // console.log('dummy data: ', this.newsFeedData);
        setTimeout(() => {
            this.setState({
                data: this.newsFeedData.articles,
                error: {
                    message: ''
                },
                noMore: true,
                loading: false,
                refreshing: false
            });
        }, 700);
    }

    loadMore() {
        const { page, loading, noMore } = this.state;
        if (loading || noMore) return;
        this.setState({ page: page + 1 }, () => this.getData());
    }

    handleRefresh() {
        this.setState({
            refreshing: true,
            manualRefresh: true
        }, () => this.getData());
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
                    <Text style={styles.errorText}>
                        { error.message }. We'll be back shortly!
                    </Text>: null
                }
                
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

                {   data.length ?
                    <GoToTopButtonComponent
                        onButtonPressed={ this.scrollToTop.bind(this) }
                    /> : null
                }
            </View>
        )
    }
}

NewsListComponent.propTypes = {
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
        padding: padding.sm,
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
        paddingTop: 125,
        paddingLeft: 35,
        paddingRight: 35
    }
});