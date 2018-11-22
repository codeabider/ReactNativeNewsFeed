import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { colors, padding, fonts } from './_base';

const NewsSummaryComponent = (props) => {
    // title, img, src, short desc (150 words max)
    const { title, urlToImage, source, description } = props.newsItem;
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
                {description ?
                    <Text style={styles.newsDescriptionText}>
                        { description.length > 150 ?
                        `${description.substr(0, 150)}...` : description }
                    </Text> :
                    null
                }
                <Text style={styles.newsSource}>Source:
                    <Text style={styles.newsSourceName}> { source.name }</Text>
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
        padding: padding.md
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
    newsSourceName: {
        fontWeight: "normal",
        color: colors.primary
    }
});

export default NewsSummaryComponent;