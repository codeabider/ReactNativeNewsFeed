import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Linking,
    Alert
} from 'react-native';
import { colors, padding, fonts } from './_base';

const NewsSummaryComponent = (props) => {
    // title, img, src, short desc (150 words max)
    const { title, urlToImage, url, description } = props.newsItem;
    return (
        <View style={styles.summaryContainer}>
            <View style={styles.summaryHeaderContainer}>
                <View style={styles.contentImage}>
                    {urlToImage ? <Image
                        style={{width: 110, height: 70}}
                        source={{uri: urlToImage}}
                    />:
                    <Image
                        style={{width: 110, height: 70}}
                        source={require('./image/featuredimage.jpg')}
                    />}
                </View>
                <View style={styles.newsTitle}>
                    <Text style={styles.newsTitleText}>{ title }</Text>
                </View>
            </View>
            <View style={styles.newsDescriptionContainer}>
                {description ? <Text style={styles.newsDescriptionText}>{ description }</Text> : null}
                <Text style={styles.newsSource}>Source:
                    <Text 
                        style={styles.newsSourceURL}
                        onPress={() => { 
                            Linking.openURL(url)
                            .catch(err => {
                                Alert.alert('Something went wrong!')
                        })
                    }}> { url.length > 80 ? `${url.substr(0, 80)}...` : url }</Text>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    summaryContainer: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: colors.secondaryBackground,
        borderRadius: 10,
        padding: padding.sm
    },
    summaryHeaderContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    contentImage: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    newsTitle: {
        flex: 2
    },
    newsTitleText: {
        fontSize: fonts.md,
        fontWeight: "bold"
    },
    newsDescriptionContainer: {
        flex: 3
    },
    newsDescriptionText: {
        fontSize: fonts.sm,
        paddingTop: padding.sm
    },
    newsSource: {
        paddingTop: padding.sm,
        fontWeight: "bold"
    },
    newsSourceURL: {
        fontWeight: "normal",
        color: colors.secondary
    }
});

export default NewsSummaryComponent;