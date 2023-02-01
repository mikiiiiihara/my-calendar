import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Option } from "../types/option";
import { AddStatusTypeDto } from "./dto/add-status-type.dto";
import { CreateOptionDto } from "./dto/create-option.dto";

export const useOption = () => {
  /*options of login user */
  const [option, setOption] = useState<Option>({ statusTypeList: [] });

  /* actions */
  const fetchOption = useCallback(async (): Promise<void> => {
    // ユーザー情報取得
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // ログインしていれば中通る
        const documentData = doc(db, "option", user.uid);
        await getDoc(documentData).then((documentSnapshot) => {
          if (typeof documentSnapshot.data() !== "undefined") {
            setOption({
              statusTypeList:
                documentSnapshot.data() !== undefined
                  ? documentSnapshot.data()?.statusTypeList
                  : [],
            });
          }
        });
      }
    });
  }, []);

  /* create */
  const createOption = useCallback(
    async (createOptionDto: CreateOptionDto): Promise<void> => {
      const { uid, statusType } = createOptionDto;
      // DB登録
      const tasksCollectionRef = doc(db, "option", uid);
      await setDoc(tasksCollectionRef, {
        statusTypeList: [statusType],
      });
      // 追加情報をstateに反映
      const newOption: Option = { statusTypeList: [statusType] };
      setOption(newOption);
    },
    []
  );

  /* add statusType */
  const addStatusType = useCallback(
    async (addStatusTypeDto: AddStatusTypeDto): Promise<void> => {
      const { uid, statusType } = addStatusTypeDto;
      // 既存のstatusTypeリストに、今回追加分を加える
      const newStatusTypeList = [...option.statusTypeList, statusType];
      const userDocumentRef = doc(db, "option", uid);
      await updateDoc(userDocumentRef, {
        statusTypeList: newStatusTypeList,
      });
      // 更新情報をstateに反映
      setOption({ statusTypeList: newStatusTypeList });
    },
    [option.statusTypeList]
  );

  /* add statusType */
  const changeStatusColor = useCallback(
    async (addStatusTypeDto: AddStatusTypeDto): Promise<void> => {
      const { uid, statusType } = addStatusTypeDto;
      // 既存のstatusTypeリストに、今回追加分を加える
      const newStatusTypeList = option.statusTypeList.map((statusTypeItem) => {
        if (statusTypeItem.name === statusType.name) return statusType;
        return statusTypeItem;
      });
      const userDocumentRef = doc(db, "option", uid);
      await updateDoc(userDocumentRef, {
        statusTypeList: newStatusTypeList,
      });
      // 更新情報をstateに反映
      setOption({ statusTypeList: newStatusTypeList });
    },
    [option.statusTypeList]
  );
  useEffect(() => {
    fetchOption();
  }, [fetchOption]);

  return {
    addStatusType,
    option,
    createOption,
    changeStatusColor,
  };
};
