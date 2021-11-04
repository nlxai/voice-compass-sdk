<template>
  <div class="space-y-4 max-w-md mx-auto">
    <div v-for="(option, index) in options" :key="index">
      <label class="block text-gray-900">
        <input
          class="mr-2 leading-tight sr-only"
          type="checkbox"
          :checked="value.indexOf(option.value) > -1"
          @input="handleInput(option.value)"
        />
        <div class="flex items-center space-x-3 cursor-pointer">
          <span
            class="
              w-6
              h-6
              inline-flex
              items-center
              justify-center
              border border-gray-500
            "
            :class="{ 'border-gray-500': value.indexOf(option.value) > -1 }"
          >
            <span
              class="
                w-4
                h-4
                inline-block
                bg-black
                bullet-mark
                transition-opacity
                duration-400
              "
              :class="{
                'opacity-100': value.indexOf(option.value) > -1,
                'opacity-0': value.indexOf(option.value) === -1,
              }"
            ></span>
          </span>
          <span class="text-md">{{ option.label }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checklist",
  props: {
    value: Array,
    options: Array,
  },
  emits: ["change"],
  methods: {
    handleInput(value) {
      if (this.value.indexOf(value) > -1) {
        this.$emit(
          "change",
          this.value.filter((val) => val !== value)
        );
      } else {
        this.$emit("change", [...this.value, value]);
      }
    },
  },
};
</script>
