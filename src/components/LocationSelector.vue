<template>
  <div class="wrapper">
    <div class="search-header">
      <p>
        {{ state.isInFocus === "from" ? props.title.start : props.title.end }}
      </p>
      <div class="icon">
        {{ props.theme.toLocaleUpperCase() }}
        <i v-if="props.theme === 'drive'" class="bi bi-person-circle" />
        <i v-if="props.theme === 'ride'" class="bi bi-people-fill" />
      </div>
    </div>
    <div class="flex flex-row">
      <div class="input-boxes">
        <div
          :class="
            state.isInFocus === 'from'
              ? `${props.theme} input-box focus`
              : `${props.theme} input-box`
          "
        >
          <div class="svg-container">
            <div
              :class="
                state.isInFocus === 'from' || state.startingPoint
                  ? 'bi-geo-alt-fill'
                  : 'bi-geo-alt'
              "
              class="bi text-sm"
            ></div>
          </div>
          <input
            v-model="state.startingPoint"
            v-on:focus="handleFocus('from')"
            :placeholder="props.help.start"
          />
        </div>
        <div class="vertical-line"></div>
        <div
          :class="
            state.isInFocus !== 'from'
              ? `${props.theme} input-box focus`
              : `${props.theme} input-box`
          "
        >
          <div class="svg-container">
            <div
              :class="state.isInFocus !== 'from' ? 'bi-geo-alt-fill' : 'bi-geo-alt'"
              class="bi text-sm"
            ></div>
          </div>
          <input
            :disabled="!state.startingPoint"
            v-model="state.endingPoint"
            v-on:focus="handleFocus('to')"
            :placeholder="props.help.end"
          />
        </div>
      </div>
      <div class="mr-4 mb-1 basis-1/4">
        <button
          class="confirm-btn"
          @click="handleConfirm"
          :disabled="state.endingPoint?.length < 3"
        >
          CONFIRM
        </button>
      </div>
    </div>
    <div v-for="item in placeSate.places" class="flex flex-row ml-4 mr-4">
      <div class="mb-1">
        <button
          class="border w-full bg-slate-100 p-2 hover:bg-white"
          v-on:click="
            (e) => {
              handleSelection(item);
            }
          "
        >
          {{ item.place_name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import axios from "axios";
interface ILocationProps {
  theme: "ride" | "drive";
  title: {
    start: string;
    end: string;
  };
  help: {
    start: string;
    end: string;
  };
}
interface IState {
  isInFocus: string;
  startingPoint: string;
  endingPoint: string;
}
const placeSate = reactive<{ places: any[] }>({
  places: [],
});
const props = defineProps<ILocationProps>();
const state = reactive<IState>({
  isInFocus: "from",
  startingPoint: "",
  endingPoint: "",
});
const emit = defineEmits(["locationSelected"]);
const handleFocus = (input: string) => {
  state.isInFocus = input;
};
const handleConfirm = (e: any) => {
  if (state.startingPoint?.length > 3 && state.endingPoint?.length > 3) {
    emit("locationSelected", {
      startingPoint: state.startingPoint,
      endingPoint: state.endingPoint,
      isSelected: true,
    });
  } else {
    emit("locationSelected", {
      startingPoint: "",
      endingPoint: "",
      isSelected: false,
    });
  }
};
const handleSelection = (item: any) => {
  debugger;
  emit("locationSelected", {
    startingPoint: item.center,
    endingPoint: state.endingPoint,
    isSelected: true,
  });
};
watch(state, (st: IState) => {
  if (st.startingPoint.length > 4) {
    placeSate.places.splice(0, placeSate.places.length);
    axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${st.startingPoint}.json?access_token=pk.eyJ1Ijoicm9tZW9qYW5lIiwiYSI6ImNrODdnd21vNDBsYzkzZ21tYWdxcGNhMDUifQ.PzHPss2BcLVgMLpL2xP4MA`
    ).then((resp) => {
      if (resp.data) {
        resp.data.features.map((item: any) => {
          placeSate.places.push(item);
        });
      }
    });
  }
});
</script>

<style scoped lang="scss">
.wrapper {
  @apply pt-2;
  .search-header {
    @apply w-full font-bold text-left flex justify-between text-2xl p-4 overflow-hidden;
    p {
      @apply font-bold text-left text-2xl;
    }
  }
  .input-boxes {
    @apply flex flex-col relative basis-5/6;
    .input-box {
      @apply h-10 mx-4 border-2 flex items-center my-1 py-1 px-2;
      input {
        @apply my-2 rounded-lg p-2 outline-none border-none bg-transparent h-full w-full;
      }
      &.focus {
        @apply border-black;
      }
    }
  }
  .confirm-btn {
    @apply bg-green-700 text-white font-bold  h-full w-full;
    &:hover {
      @apply text-yellow-300;
    }
    &:disabled {
      @apply bg-gray-200 text-gray-400 cursor-not-allowed;
    }
  }
  .svg-container {
    @apply mx-1;
  }
  .vertical-line {
    @apply w-0 h-[1.85rem] border-black border absolute z-10 left-[2.25rem] top-[2rem];
  }
  .ride {
    @apply bg-[#eeeeee];
  }
  .drive {
    @apply bg-green-50;
  }
}
</style>
