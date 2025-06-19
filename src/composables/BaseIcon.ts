import { defineComponent, h, mergeProps } from "vue";
import { QIcon } from "quasar";

export default defineComponent({
    name: "BaseIcon",
    props: {
        name: {
            type: String,
            required: true,
        },
        color: String,
        size: String,
        tag: {
            type: String,
            default: "span",
        },
        class: {
            type: [String, Array, Object],
            default: "",
        },
        style: {
            type: [String, Object, Array],
            default: "",
        },
        ariaLabel: String,
        iconProps: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props, { slots }) {
        return () =>
            h(
                props.tag,
                {
                    class: ["base-icon", props.class],
                    style: props.style,
                    "aria-label": props.ariaLabel,
                },
                slots.icon
                    ? slots.icon()
                    : slots.default
                      ? slots.default()
                      : h(QIcon, {
                            name: props.name,
                            color: props.color,
                            size: props.size,
                            ...props.iconProps,
                        }),
            );
    },
});
