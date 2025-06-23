import { Platform, StyleSheet } from "react-native";
import { AppFonts } from "../../../../themes/AppFonts";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
    fontSize: 16,
  },
  button: {
    width: '95%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: Platform.OS == "ios" ? 50 : 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    width: 200, // Adjust size as needed
    height: 200, // Adjust size as needed
    resizeMode: 'contain', // Ensures the image maintains its aspect ratio
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontFamily: AppFonts.Medium,
  },
  inputIcon: {
    marginLeft: 10,
  },
});