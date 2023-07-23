import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CTA from '../../shared/components/CTA/CTA';
import {styled} from 'styled-components';
import {textClick} from '../../shared/utils/haptics';
import {CustomImage} from '../../shared/components/CustomImage/CustomImage';
import {truncate} from '../../shared/utils/truncate';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import AddressSearch from './components/AddressSearch';
import {useHeaderHeight} from '@react-navigation/elements';
import ScreenContainer from '../../shared/components/ScreenContainer/ScreenContainer';
import {MainHeading} from '../../shared/components/Typography';
import useDataStore from '../../state/dataStore';

const ItemContainer = styled(TouchableOpacity)`
  flex-direction: row;
  margin: 10px;
`;

const TitleText = styled(Text)`
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  color: rgba(250, 250, 250, 1);
`;

const SubTitleContainer = styled(View)`
  background-color: #3d3d3f;
  padding: 3px;
  border-radius: 4px;
  align-self: flex-start;
`;

const SubTitleText = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(128, 128, 128, 1);
`;

export default function Address(props) {
  const {navigation} = props;
  const [text, setText] = React.useState<string>('');
  const [hasSelectedAddress, setHasSelectedAddress] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const masterData = [];
  const headerHeight = useHeaderHeight();
  const recepientAddress = useDataStore(state => state.recepientAddress);
  const setRecepientAddress = useDataStore(state => state.setRecepientAddress);

  const searchFilter = data => {
    //check name
    if (data) {
      const nameData = masterData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredData([...nameData]);
    } else {
      setFilteredData(masterData);
    }
    setText(data);
  };

  const SearchItem: React.FC = ({item}) => {
    const {name, address} = item;

    return (
      <ItemContainer
        onPress={() => {
          textClick();
          setHasSelectedAddress(true);
          setRecepientAddress(address);
          setText(address);
        }}>
        <CustomImage
          width={'48px'}
          height={'48px'}
          source={item.imageSource}
          style={{margin: 2}}
        />
        <View style={{marginLeft: 8, justifyContent: 'space-between'}}>
          <TitleText>{name}</TitleText>
          <SubTitleContainer>
            <SubTitleText>{truncate(recepientAddress, 10)}</SubTitleText>
          </SubTitleContainer>
        </View>
      </ItemContainer>
    );
  };
  return (
    <ScreenContainer>
      <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
        <MainHeading>Select Address</MainHeading>
        <KeyboardAvoidingView
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? headerHeight + 55 : 30
          }
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <AddressSearch
            handleOnChange={searchFilter}
            value={text}
            placeholder={'Name or Address'}
          />
          <View style={{flex: 0.98}}>
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={SearchItem}
            />
          </View>

          <CTA
            title={'Next'}
            onPress={() => {
              setRecepientAddress(text);
              navigation.push('Amount');
            }}
            disabled={text.length === 0}
          />
        </KeyboardAvoidingView>
      </Pressable>
    </ScreenContainer>
  );
}
