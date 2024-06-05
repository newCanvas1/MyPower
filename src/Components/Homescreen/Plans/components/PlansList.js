import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { getTable } from "../../../../../database/database";
import { useState, useEffect } from "react";
import { DatabaseContext } from "../../../../../context/DataContext";
import PlanItem from "./PlanItem";
import { langChoice } from "../../../../utility/functions/langChoice";
import { LanguageContext } from "../../../../../context/LanguageContext";
import { ARABIC, ENGLISH } from "../../../../utility/labels";
function PlansList(props) {
  const { plans } = useContext(DatabaseContext);
  const { language } = useContext(LanguageContext);
  useEffect(() => {}, [plans]);
  // grid flat list
  return (
    <View className="mt-3">
      {plans.length > 0 ? (
        <FlatList
          className="w-full rounded-lg h-60 "
          contentContainerStyle={{ alignItems: "center" }}
          numColumns={2}
          data={plans}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlanItem item={item} />}
        />
      ) : (
        <Text
          style={{ fontFamily: "appFont" }}
          className="text-center text-gray-500 text-sm"
        >
          {langChoice(language, ENGLISH.NO_PLANS, ARABIC.NO_PLANS)}
        </Text>
      )}
    </View>
  );
}

export default PlansList;
