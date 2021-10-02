

struct D
{
  //Use required attributes
  int mn;

  //Default Values
  D() : mn(1e9) {};
};

struct SegTree
{
  int SZ;
  vector<D> st;

  void init(int n)
  {
    SZ = n;
    st.resize(4 * SZ + 5);
  }

  //Write reqd merge functions
  void merge(D &cur, D &l, D &r) 
  {
    cur.mn = min(l.mn, r.mn);
  }
  


  void build(int node, int L, int R)
  {
    if(L==R)
    {
      st[node].mn = 1e9;
      return;
    }
    int M=(L + R)/2;
    build(node*2, L, M);
    build(node*2 + 1, M + 1, R);
    merge(st[node], st[node*2], st[node*2+1]);
  }

  D Query(int node, int L, int R, int i, int j)
  {
    if(j<L || i>R)
      return D();
    if(i<=L && R<=j)
      return st[node];
    int M = (L + R)/2;
    D left=Query(node*2, L, M, i, j);
    D right=Query(node*2 + 1, M + 1, R, i, j);
    D cur;
    merge(cur, left, right);
    return cur;
  }

  D pQuery(int node, int L, int R, int pos)
  {
    if(L == R)
      return st[node];
    int M = (L + R)/2;
    if(pos <= M)
      return pQuery(node*2, L, M, pos);
    else
      return pQuery(node*2 + 1, M + 1, R, pos);
  } 

  void Update(int node, int L, int R, int i, int j, int val)
  {
    if(j<L || i>R)        return;
    if(i<=L && R<=j)      return;

    int M = (L + R)/2;
    Update(node*2, L, M, i, j, val);
    Update(node*2 + 1, M + 1, R, i, j, val);
    merge(st[node], st[node*2], st[node*2 + 1]);
  }

  void pUpdate(int node, int L, int R, int pos, int val)
  {
    if(L == R)     
    {
      // update here 
     return;
    }
    int M = (L + R)/2;
    if(pos <= M)    pUpdate(node*2, L, M, pos, val);
    else            pUpdate(node*2 + 1, M + 1, R, pos, val);
    
    merge(st[node], st[node*2], st[node*2 + 1]);
  }

  D query(int pos)
  {
    return pQuery(1, 1, SZ, pos);
  }

  D query(int l, int r)
  {
    return Query(1, 1, SZ, l, r);
  }

  void update(int pos, int val)
  {
    pUpdate(1, 1, SZ, pos, val);
  }

  void update(int l, int r, int val)
  {
    Update(1, 1, SZ, l, r, val);
  }
};



/*

SegTree s;
s.init(n);     // size of array
s.build(1,1,n);// node start end 

// things to change build,merge,pupdate 
*/

