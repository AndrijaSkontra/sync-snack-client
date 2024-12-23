"use client";
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export default function RateFilterSlider({ setRateFilter }: any) {
  const t = useTranslations("OrdersPage");

  return (
    <Box className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto px-4 sm:px-6 md:px-8">
      <fieldset className="border border-gray-300 rounded-md px-10 py-4 dark:border-gray-700">
        <legend className="text-sm dark:text-gray-600 text-gray-500">
          Rating filter
        </legend>
        <Slider
          defaultValue={0}
          min={0}
          max={5}
          step={1}
          onChangeEnd={setRateFilter}
          className="mt-8 mb-12"
        >
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <SliderMark key={value} value={value} mt="4" className="-ml-2">
              {value === 0 ? `${t("Select-option-all")}` : "★"}
            </SliderMark>
          ))}
          <SliderTrack h="3px">
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb
            boxSize={6}
            borderWidth="2px"
            _focus={{ boxShadow: `0 0 0 1px` }}
          />
        </Slider>
      </fieldset>
    </Box>
  );
}
