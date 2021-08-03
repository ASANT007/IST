package com.aniktantra.ist;

import javax.crypto.Cipher; 
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;
//import sun.misc.BASE64Decoder;
//import sun.misc.BASE64Encoder;
import java.util.Base64;

public class FileEncryption 
{
   private PBEKeySpec pbeKeySpec;
   private PBEParameterSpec pbeParamSpec;
   private SecretKeyFactory keyFac;  
   private Cipher pbeCipher;
   private SecretKey pbeKey;
   private String key = "YK";
   private int count = 20;
   private byte[] bSalt = new byte[8]; 
  // Salt
   byte[] salt = {
        (byte)0xc7, (byte)0x73, (byte)0x21, (byte)0x8c,
        (byte)0x7e, (byte)0xc8, (byte)0xee, (byte)0x99 
   };  
  
   public String Encrypt(String strToEncrypt)
   {
       String encryptedStr = "";
       try
       {
            Base64.Encoder encoder = Base64.getMimeEncoder(); 
            encryptedStr = encoder.encodeToString(strToEncrypt.getBytes());
            
       }catch(Exception e)
       {
           e.printStackTrace();
       }
       return encryptedStr;
       
   }
   
   public String Decrypt(String encryptedStr)
   {
       String decryptStr = "";
       try
       {
            Base64.Decoder decoder = Base64.getMimeDecoder();  
            decryptStr = new String(decoder.decode(encryptedStr));  
            
       }catch(Exception e)
       {
           e.printStackTrace();
       }
       return decryptStr;
       
   }
   /*public String Encrypt(String password) {
           try {
    
                // Create PBE parameter set
                pbeParamSpec = new PBEParameterSpec(salt, count);
                pbeKeySpec = new PBEKeySpec(key.toCharArray());  
                keyFac = SecretKeyFactory.getInstance("PBEWithMD5AndDES");  
                pbeKey = keyFac.generateSecret(pbeKeySpec);  
                // Create PBE Cipher  
                pbeCipher = Cipher.getInstance("PBEWithMD5AndDES");  
                // Initialize PBE Cipher with key and parameters  
                pbeCipher.init(Cipher.ENCRYPT_MODE, pbeKey, pbeParamSpec);  
                // Our cleartext  
                byte[] cleartext = password.getBytes();  
                // Encrypt the cleartext  
                byte[] encryptedPassword = pbeCipher.doFinal(cleartext);
                String hash = (new BASE64Encoder()).encode(encryptedPassword);
                return hash;

                } catch (java.security.NoSuchAlgorithmException nsae) {
                    System.out.println("NoSuchAlgorithmException" + nsae.getStackTrace());
                    
                } catch (javax.crypto.NoSuchPaddingException nspe) {
                    System.out.println("NoSuch Padding Exception" + nspe.getStackTrace());
                    
                } catch (java.security.InvalidKeyException ivke) {
                    System.out.println("InvalidKey Exception" + ivke.getStackTrace());
                    
                } catch (javax.crypto.BadPaddingException bpe) {
                    System.out.println("NoSuch Algorithm Exception" + bpe.getStackTrace());
                    
                } catch (javax.crypto.IllegalBlockSizeException ibse) {
                    System.out.println("NoSuch Algorithm Exception" + ibse.getStackTrace());
                    
                } catch (java.security.InvalidAlgorithmParameterException iape) {
                    System.out.println("Invalid Algorithm ParameterException" + iape.getStackTrace());
                    
                } catch (Exception e) {
                    System.out.println("General Exception" + e.getStackTrace());
                }
          return null;
          
    }
  
  
   public String Decrypt(String encryptedPassword){
       
   try {
    
         pbeParamSpec = new PBEParameterSpec(salt, count);
         pbeKeySpec = new PBEKeySpec(key.toCharArray());  
         keyFac = SecretKeyFactory.getInstance("PBEWithMD5AndDES");  
         pbeKey = keyFac.generateSecret(pbeKeySpec);  
         // Create PBE Cipher  
         pbeCipher = Cipher.getInstance("PBEWithMD5AndDES");  
         // Initialize PBE Cipher with key and parameters  
         pbeCipher.init(Cipher.ENCRYPT_MODE, pbeKey,pbeParamSpec);  
           //decrypt
         pbeCipher.init(Cipher.DECRYPT_MODE, pbeKey, pbeParamSpec);
         byte hash[] = (new BASE64Decoder()).decodeBuffer(encryptedPassword);

         byte[] decryptPassword = pbeCipher.doFinal(hash);
         return new String(decryptPassword);
     
        } catch (java.security.NoSuchAlgorithmException nsae) {
                    System.out.println("NoSuchAlgorithmException" + nsae.getStackTrace());
                    
        } catch (javax.crypto.NoSuchPaddingException nspe) {
                    System.out.println("NoSuch Padding Exception" + nspe.getStackTrace());
                    
        } catch (java.security.InvalidKeyException ivke) {
                    System.out.println("InvalidKey Exception" + ivke.getStackTrace());
                    
        } catch (javax.crypto.BadPaddingException bpe) {
                    System.out.println("NoSuch Algorithm Exception" + bpe.getStackTrace());
                    
        } catch (javax.crypto.IllegalBlockSizeException ibse) {
                    System.out.println("NoSuch Algorithm Exception" + ibse.getStackTrace());
                    
        } catch (java.security.InvalidAlgorithmParameterException iape) {
                    System.out.println("Invalid Algorithm ParameterException" + iape.getStackTrace());
                    
        } catch (Exception e) {
                    System.out.println("General Exception" + e.getStackTrace());
        }
        return null;
}*/

  
  public static void main(String[] args) 
  {
  FileEncryption fe = new FileEncryption();
  String encryptedString = null;
  
  //encryptedString = fe.Encrypt("admin@123");//JS+PJHzq6/NeA0rlAH5lAg==
  //encryptedString = fe.Encrypt("Pass@1234");
  encryptedString = fe.Encrypt("*****");
  //encryptedString = fe.Encrypt("Dgj7@1sg");//RGdqN0Axc2c=
  //encryptedString = fe.Encrypt("admin@123");//YWRtaW5AMTIz 
  System.out.println("encryptedString:  "+encryptedString); 
  //String decryptedString = fe.Decrypt("YW1vbEBBbmlrdGFudHJhMTIzNA==");//root
  String decryptedString = fe.Decrypt("SGFwcHlAYW5pa3RhbnRyYTAz");//root
  

  System.out.println("#### decryptedString:  "+decryptedString);
     

  
}

  
  
  

} 
