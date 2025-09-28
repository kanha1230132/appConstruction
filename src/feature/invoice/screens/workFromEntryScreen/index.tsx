import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppColor } from "../../../../themes/AppColor";
import { WorkFromEntryScreenProps } from "../../../../types/navigation";
import { IWorkFromEntry } from "../../../../store/slice/Reports";
import { DateFormat } from "../../../../utils/dateUtil";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack } from "../../../../utils/NavigationUtil";
import { AppFonts } from "../../../../themes/AppFonts";
import { Divider } from "react-native-paper";

const WorkFromEntryScreen: React.FC<WorkFromEntryScreenProps> = ({
  route,
  navigation,
}) => {
  const { workFromEntry } = route.params;
  const [activeTab, setActiveTab] = useState(0); // 0 chargable , 1 non-chargable
  const [ChargableEntry, setChargableEntry] = useState<IWorkFromEntry[]>([]);
  const [NonChargableEntry, setNonChargableEntry] = useState<IWorkFromEntry[]>(
    []
  );

  useEffect(() => {
    if (workFromEntry?.length) {
      const cEntry: IWorkFromEntry[] = [];
      const ncEntry: IWorkFromEntry[] = [];
      workFromEntry.map((item) => {
        if (item?.IsChargable) {
          cEntry.push(item);
        } else {
          ncEntry.push(item);
        }
      });
      cEntry.sort(
        (a, b) => new Date(a.selectedDate) - new Date(b.selectedDate)
      );
      ncEntry.sort(
        (a, b) => new Date(a.selectedDate) - new Date(b.selectedDate)
      );
      setChargableEntry(cEntry);
      setNonChargableEntry(ncEntry);
    }
  }, []);
  return (
     <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={"Work From Home Entries"}
          onBackClick={() => {
            goBack();
          }}
          customStyle={undefined}
        />
           <View style={styles.container}>

  

        {activeTab == 0 && ChargableEntry?.length > 0 ? (
          <>
            <View
              style={{
                marginVertical: 10,
              }}
            >
              <Text style={styles.label}>Project Name</Text>
              <Text style={styles.detailText}>
                {ChargableEntry[0]?.projectName}
              </Text>
              <View style={styles.divider} />

              <Text style={styles.label}>Client PO/Reference Number</Text>
              <Text style={styles.detailText}>
                {ChargableEntry[0]?.projectNumber}
              </Text>
              <View style={styles.divider} />

              <Text style={styles.label}>Contractor</Text>
              <Text style={styles.detailText}>
                {ChargableEntry[0]?.contractor}
              </Text>
              <View style={styles.divider} />

              <Text style={styles.label}>Owner Contact</Text>
              <Text style={styles.detailText}>
                {ChargableEntry[0]?.ownerContact}
              </Text>
              <View style={styles.divider} />
            </View>

            <ScrollView>
              {ChargableEntry.map((item) => {
                return (
                  <View key={item?.id} style={styles.detailContainer}>
                    <Text style={{
                      fontFamily: AppFonts.Bold,
                      fontSize: 16,
                      color: AppColor.WHITE,
                      marginBottom: 10,
                      backgroundColor: AppColor.PRIMARY,
                      padding:4,
                      paddingHorizontal:10,
                      borderRadius:6
                    }}>{item?.username}</Text>
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.detailText}>
                      {moment(item?.selectedDate).utc().format(DateFormat.DD_MM_YYYY)}
                    </Text>
                    <View style={styles.divider} />
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.detailText}>{item?.description}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </>
        ) : null}

        {activeTab == 0 && ChargableEntry?.length == 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}>No Chargable Entries Found</Text>
          </View>
        ) : null}
        {activeTab == 1 && NonChargableEntry?.length == 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20 }}>No Non-Chargable Entries Found</Text>
          </View>
        ) : null}

        {activeTab == 1 && NonChargableEntry?.length > 0 ? (
          <>
            <View
              style={{
                margin: 20,
              }}
            >
              <Text style={styles.label}>Project Name</Text>
              <Text style={styles.detailText}>
                {NonChargableEntry[0]?.projectName}
              </Text>
              <View style={styles.divider} />

              <Text style={styles.label}>Client PO/Reference Number</Text>
              <Text style={styles.detailText}>
                {NonChargableEntry[0]?.projectNumber}
              </Text>
              <View style={styles.divider} />

              <Text style={styles.label}>Contractor</Text>
              <Text style={styles.detailText}>
                {NonChargableEntry[0]?.contractor}
              </Text>
              <View style={styles.divider} />

              <Text style={styles.label}>Owner Contact</Text>
              <Text style={styles.detailText}>
                {NonChargableEntry[0]?.ownerContact}
              </Text>
              <View style={styles.divider} />
            </View>

            <ScrollView>
              {NonChargableEntry.map((item) => {
                return (
                  <View
                    key={item?.id + Math.random()}
                    style={styles.detailContainer}
                  >
                    <Text style={styles.label}>Date</Text>
                    <Text style={styles.detailText}>
                      {moment(item?.selectedDate).format(DateFormat.DD_MM_YYYY)}
                    </Text>
                    <View style={styles.divider} />
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.detailText}>
                      {String(item?.description)}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </>
        ) : null}
      </View>
        </SafeAreaWrapper>
        </>
  );
};

export default WorkFromEntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "bold",
  },
  detailContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F9FAFB",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#D3D3D3",
    marginVertical: 4,
  },
});
