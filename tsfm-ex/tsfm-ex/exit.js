return(async function(){
  await fmi.writeString(doci+"/tsfm-ex/saves.json", JSON.stringify(await Run("saves"), null, "\t"))
  return "break"
})()