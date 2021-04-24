import React from "react";
import { ScrollView, TouchableOpacity, View, Text, Image } from "react-native";
import { SvgXml } from "react-native-svg";

import { Styles } from "./privacy.modules";
import buttonBack from "../../assets/app/button_back.svg";
import backgroundLogo from "../../../assets/app/dark_logo.png";

export default Privacy = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={Styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <SvgXml
            width="30"
            height="30"
            xml={buttonBack}
            style={Styles.backIcon}
          />
        </TouchableOpacity>
        <Image source={backgroundLogo} style={Styles.picture} />
        <View style={Styles.content}>
          <Text style={Styles.title}>Privacy Policy</Text>
          <Text style={Styles.smallTitle}>Information We Collect</Text>
          <Text style={Styles.text}>
            There are two types of Information that may be collected through our
            Platform: (1) “Personal Information” such as your name and e-mail
            address and other information that can be used to directly identify
            you, and (2) “Usage Data” which is data related to your use of the
            Platform (e.g., the pages you visit, the sites you use before or
            after visiting ours) or anonymous information about the computer or
            device used to access the Platform (e.g., your IP address or device
            ID).
          </Text>
          <Text style={Styles.text}>
            You may enter the Platform and browse its content without submitting
            any Personal Information. However, if you wish to establish an
            account, contact us, subscribe or opt in to any newsletter, alerts,
            or other communications, or otherwise communicate with us in any
            way, we may at that time require that you provide certain Personal
            Information such as your name and e-mail address. When you submit
            Personal Information through the Platform, whether by directly
            providing it to us upon request or voluntarily disclosing it, you
            are giving your consent to the collection, use and disclosure of
            your Personal Information as set forth in this Privacy Policy.
          </Text>
          <View style={Styles.paragraph}>
            <Text style={Styles.smallTitle}>
              Uses and Sharing of Information
            </Text>
            <Text style={Styles.text}>
              We use your Personal Information that we collect to send you
              communications, authenticate website visits/usage, process your
              requests, send you promotional e-mails, and otherwise communicate
              with you. You always will be given the opportunity to unsubscribe
              from further emails in any promotional messages we send you.
            </Text>
            <Text style={Styles.text}>
              We contract with companies or individuals to provide certain
              services including email and hosting services, software
              development, data management, surveys and marketing, promotional
              services. We call them our “Service Providers.” We may share both
              your Personal Information and Usage Data with Service Providers
              solely as appropriate for them to perform their services for us.
            </Text>
          </View>
          <View style={Styles.paragraph}>
            <Text style={Styles.smallTitle}>
              Except as described above, we will not disclose, rent, sell or
              share any Personal Information to third parties for marketing
              purposes.
            </Text>
            <Text style={Styles.text}>
              Usage Data may be used in aggregate form for internal business
              purposes, such as optimizing the platform, generating statistics
              and developing marketing plans. We may also use, share or transfer
              such aggregated, anonymized Usage Data with or to our affiliates,
              licensees and partners for administrative, analytical, research,
              optimization, security and other purposes, but no such information
              will be linked with your Personal Information or be used to
              identify or contact you.
            </Text>
            <Text style={Styles.text}>
              Finally, we may share your Information: (i) In response to
              subpoenas, court orders, or other legal process; to establish or
              exercise our legal rights; to defend against legal claims; or as
              otherwise required by law. In such cases we reserve the right to
              raise or waive any legal objection or right available to us; (ii)
              When we believe it is appropriate to investigate, prevent, or take
              action regarding illegal or suspected illegal activities; to
              protect and defend the rights, property, or safety of our company,
              our users, or others; and in connection with the enforcement of
              our Terms of Use and other agreements; or (iii) In connection with
              a corporate transaction, such as a divestiture, merger,
              consolidation, or asset sale, or in the unlikely event of
              bankruptcy.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
