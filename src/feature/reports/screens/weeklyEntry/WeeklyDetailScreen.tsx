import { StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaWrapper } from "../../../../components/SafeAreaWrapper/SafeAreaWrapper";
import { WeeklyDetailScreenProps } from "../../../../types/navigation";
import HeaderWithBackButton from "../../../../components/Button/HeaderWithBackButton";
import { goBack } from "../../../../utils/NavigationUtil";
import { reportDetailsType } from "../../helper/reportsType";
import { AppFonts } from "../../../../themes/AppFonts";
import { AppColor } from "../../../../themes/AppColor";
import ScrollViewWrapper from "../../../../components/ScrollViewWrapper/ScrollViewWrapper";
import LabourDetails from "./components/LabourDetails";
import EquipmentDetails from "./components/EquipmentDetails";
import VistorDetails from "./components/VistorDetails";
import DescriptionDetails from "./components/DescriptionDetails";
import PhotoFilesDetails from "./components/PhotoFilesDetails";
import { Equipment, Labour2, Visitor } from "../../../../api/apiInterface";

const WeeklyDetailScreen: React.FC<WeeklyDetailScreenProps> = ({ route }) => {
  const [HeaderTitle, setHeaderTitle] = useState("");
  const [Equipments, setEquipments] = useState<Equipment[]>([]);
  const [Labour, setLabour] = useState<Labour2[]>([]);
  const [Visitors, setVisitors] = useState<Visitor[]>([]);
  const [Description, setDescription] = useState<string>('');
  const [PhotoFiles, setPhotoFiles] = useState([]);
  const [Type, setType] = useState("");

  useEffect(() => {
    const type = route?.params?.type;
    const item = route?.params?.list;
    setType(type);
    if (type == reportDetailsType.equipment) {
      setHeaderTitle("Equipment Details");
      setEquipments(item || []);
    } else if (type == reportDetailsType.visitor) {
      setHeaderTitle("Visitor Details");
      setVisitors(item || []);
    } else if (type == reportDetailsType.labour) {
      setHeaderTitle("Labour Details");
      setLabour(item || []);
    } else if (type == reportDetailsType.description) {
      setHeaderTitle("Project Description");
      setDescription(item || '');
    } else if (type == reportDetailsType.photoFiles) {
      setHeaderTitle("Photo Files");
      setPhotoFiles(item || []);
    }
  }, []);

  return (
    <>
      <SafeAreaWrapper>
        <HeaderWithBackButton
          title={HeaderTitle}
          onBackClick={() => goBack()}
          customStyle={undefined}
        />

        <ScrollViewWrapper>

        {/* Equipment */}
        {Type == reportDetailsType.equipment &&
        <EquipmentDetails  equipmentList = {Equipments}/>
        }

        {/* Labour */}
        {Type == reportDetailsType.labour &&
        <LabourDetails labourList = {Labour} />
           
            }

        {/* Visitor */}
        {Type == reportDetailsType.visitor &&
        <VistorDetails visitorList = {Visitors} />
        }

        {/* Description */}
        {Type == reportDetailsType.description &&
        <DescriptionDetails description = {Description} />
        }

        {/* photoFiles */}
        {
        Type == reportDetailsType.photoFiles &&
        <PhotoFilesDetails photoFiles = {PhotoFiles} />
        }

        </ScrollViewWrapper>
      </SafeAreaWrapper>
    </>
  );
};

export default WeeklyDetailScreen;

const styles = StyleSheet.create({
  equipmentName: {
    fontFamily: AppFonts.Bold,
    fontSize: 16,
    color: AppColor.BLACK,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#fafafa",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: AppColor.BLACK_70,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: AppFonts.Medium,
    color: "#212121",
  },
  totalHours: {
    color: AppColor.PRIMARY,
    fontFamily: AppFonts.Bold,
  },
  itemDivider: {
    backgroundColor: "#e0e0e0",
    height: 1,
  },
  accordion: {
    backgroundColor: "#f5f5f5",
    marginVertical: 4,
    borderRadius: 4,
  },
});
