import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

const reactotron = Reactotron.setAsyncStorageHandler!(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({ name: "100k" }) // controls connection & communication settings
    .useReactNative({
        asyncStorage: true, // there are more options to the async storage.
        networking: {
            // optionally, you can turn it off with false.
            ignoreUrls: /symbolicate/,
        },
        editor: false, // there are more options to editor
        errors: { veto: (stackFrame) => false }, // or turn it off with false
        overlay: true, // just turning off overlay
    }) // add all built-in react native plugins
    .use(reactotronRedux())
    .connect(); // let's connect!
    reactotron.log!("connected")

export default reactotron;
