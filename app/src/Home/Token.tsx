// import {Button, Text} from 'react-native';
// import React, {useState} from 'react';

// import {TextInput} from 'react-native-gesture-handler';
// import ScreenContainer from '../shared/components/ScreenContainer/ScreenContainer';

// export default function Token(props) {
//   const {navigation} = props;
//   const [searchQuery, setSearchQuery] = useState('');
//   return (
//     <ScreenContainer>
//       <Text>Token</Text>
//       <TextInput
//         editable
//         multiline
//         numberOfLines={4}
//         maxLength={40}
//         onChangeText={text => {
//           console.log(text);
//           setSearchQuery(text);
//         }}
//         value={searchQuery}
//         style={{padding: 10, borderColor: 'black', borderWidth: 1}}
//       />
//       <Button onPress={() => navigation.push('Address')} title="next" />
//     </ScreenContainer>
//   );
// }

import {
  View,
  Text,
  FlatList,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import styled from 'styled-components';

// import {TouchableOpacity} from 'react-native-gesture-handler';
import Searchbar from '../shared/components/Searchbar/Searchbar';
import {CustomImage} from '../shared/components/CustomImage/CustomImage';
import {textClick} from '../shared/utils/haptics';
import ScreenContainer from '../shared/components/ScreenContainer/ScreenContainer';
import CTA from '../shared/components/CTA/CTA';

const MainHeading = styled(Text)`
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  color: white;
  text-align: center;
  padding-bottom: 30px;
  align-self: center;
  margin-top: 5px;
`;

const TitleText = styled(Text)`
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  color: rgba(250, 250, 250, 1);
`;

const SubTitleText = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(128, 128, 128, 1);
`;
const ItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  padding: 10px 0px;
  margin: 4px 0px;
`;

const FixedContainer = styled(View)`
  position: absolute;
  bottom: 50px;
  width: 100%;
  align-self: center;
`;

interface SearchItemProps {
  title: string;
  subtitle: string;
  ImageSource?: ImageSourcePropType;
}

export default function SearchCoin(props) {
  const [text, onChangeText] = React.useState<string>('');
  const {navigation} = props;

  const [filteredData, setFilteredData] = useState([{}]);
  const [masterData, setMasterData] = useState([{}]);
  const [hasSelectedCoin, setHasSelectedCoin] = useState(false);

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      onChangeText(text);
    } else {
      setFilteredData(masterData);
      onChangeText(text);
    }
  };

  const SearchItem: React.FC = ({item}) => {
    const {name, amount} = item;
    return (
      <ItemContainer
        onPress={() => {
          textClick();
          setCoin(item);
          setHasSelectedCoin(true);
        }}>
        <CustomImage width={'48px'} height={'48px'} source={item.imageSource} />
        <View style={{marginLeft: 8, justifyContent: 'center'}}>
          <TitleText>{name}</TitleText>
          <SubTitleText>{amount}</SubTitleText>
        </View>
      </ItemContainer>
    );
  };

  useEffect(() => {
    if (hasSelectedCoin) {
      props.next();
    }
  }, [hasSelectedCoin, props]);

  return (
    <ScreenContainer>
      <MainHeading>Select Coin</MainHeading>
      <Searchbar
        handleOnChange={searchFilter}
        text={text}
        placeholder={'Search...'}
        shouldShowSearchIcon={true}
      />
      <FlatList
        style={{flex: 1}}
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={SearchItem}
      />
      <FixedContainer>
        <CTA title="Next" onPress={() => navigation.push('Address')} />
      </FixedContainer>
    </ScreenContainer>
  );
}
