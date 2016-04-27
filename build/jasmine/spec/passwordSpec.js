describe('password lenght', function(){
  it('should return true if password is at least 8 characters long', function(){
    expect(passwordLength("12345678")).toBe(true);
    expect(passwordLength("123")).toBe(false);
  });
});

describe('includes a symbol', function(){
  it('should return true if password includes a symbol (!,@,#,$,%,^,&,*)', function(){
    expect(includesSymbol("abc123!")).toBe(true);
    expect(includesSymbol("abc123>")).toBe(false);
  });
});

describe('includes a number', function(){
  it('should return true if password includes one number', function(){
    expect(includesNumber("123a")).toBe(true);
    expect(includesNumber("abcdf")).toBe(false);
  });
});

  
describe('includes uppercase letter', function(){
  it('should return true if password includes an uppercase letter', function(){
    expect(includesUppercase("ABC3#")).toBe(true);
    expect(includesUppercase("abcd")).toBe(false);
  });
});
   
describe('includes lowercase letter', function(){
  it('should return true if password includes an lowercase letter', function(){
    expect(includesLowercase("efg!3")).toBe(true);
    expect(includesLowercase("EFG3")).toBe(false);
  });
}); 

describe('includes illegal characters', function(){
    it('should return true if password does not include any illegal characters', function(){
    expect(includesIllegal("abc123aou>")).toBe(true);
    expect(includesIllegal("abc123aou")).toBe(false);
  });
})  
