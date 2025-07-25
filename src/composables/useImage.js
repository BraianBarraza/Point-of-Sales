import {ref, computed} from 'vue';
import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { uid } from 'uid'

export default function useImage() {

  const url = ref('')
  const storage = useFirebaseStorage()

  const onFileChange = (e) => {
    const file = e.target.files[0]
    const filename = uid() + '.jpg'
    const sRef = storageRef(storage, '/products/' + filename)

    //upload data
    const uploadTask = uploadBytesResumable(sRef, file)
    uploadTask.on(
      'state_changed',
      () => {},
      (err) => console.log(err),
      () => {
        //Upload done
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL)=>{
            url.value = downloadURL
          })
      },
    )
  }

  const imageUploaded = computed(() => {
    return url.value ? url.value : null
  })

  return {
    url,
    imageUploaded,
    onFileChange,
  }
}
