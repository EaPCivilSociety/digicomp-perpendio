import React from 'react';
import { resources } from 'data';
import { Page, Text, View } from '@react-pdf/renderer';
import commonStyles from '../common-styles';
import resourceDescription from '../util/resource-description';

export default function Resources() {
  return (
    <Page style={commonStyles.pageBody}>
      <Text style={commonStyles.h2}>Resources</Text>

      {resources.map((resource: any) => (
        <View key={resource.title} wrap={false}>
          <Text style={commonStyles.h4}>{resource.title}</Text>
          <Text
            style={[
              commonStyles.small,
              commonStyles.bold,
              { marginVertical: 2 },
            ]}
          >
            {resource.url}
          </Text>
          <Text style={commonStyles.mb1}>{resourceDescription(resource)}</Text>
        </View>
      ))}
    </Page>
  );
}
