class StringConverters {

  async base64(string) {
    
    try {
      const base64 = await Buffer.from(string).toString('base64');
      return base64;
    } catch (error) {
      return false;
    }
  }

}

export default new StringConverters();