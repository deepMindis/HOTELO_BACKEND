PGDMP                         {           hotelo    15.2    15.2 +    X           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            [           1262    16398    hotelo    DATABASE     h   CREATE DATABASE hotelo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE hotelo;
                postgres    false            �            1259    16424    booking    TABLE     �   CREATE TABLE public.booking (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    numberchild smallint,
    numberadult smallint,
    bookingcheckin date,
    bookingcheckout date,
    total integer,
    paymenttype smallint,
    userid uuid NOT NULL
);
    DROP TABLE public.booking;
       public         heap    postgres    false            �            1259    24667    cell    TABLE     �   CREATE TABLE public.cell (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    room_id uuid NOT NULL,
    status integer DEFAULT 0
);
    DROP TABLE public.cell;
       public         heap    postgres    false            �            1259    16409    room    TABLE     #  CREATE TABLE public.room (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    roomnumber integer,
    petfrindly smallint,
    roomdescripe text,
    roomtypeid uuid NOT NULL,
    roomcoast integer,
    roomstate smallint,
    photo character varying,
    smokefrindly character varying
);
    DROP TABLE public.room;
       public         heap    postgres    false            �            1255    24730 @   new_update(date, date, integer, integer, integer, integer, uuid) 	   PROCEDURE     8  CREATE PROCEDURE public.new_update(IN a date, IN b date, IN c integer, IN d integer, IN e integer, IN f integer, IN g uuid)
    LANGUAGE sql
    BEGIN ATOMIC
 INSERT INTO public.booking (bookingcheckin, bookingcheckout, total, numberadult, numberchild, paymenttype, userid)
   VALUES (new_update.a, new_update.b, new_update.c, new_update.d, new_update.e, new_update.f, new_update.g);
 UPDATE public.cell SET status = 1
   WHERE (cell.user_id = new_update.g);
 UPDATE public.room SET roomstate = 1
   WHERE (room.id IN ( SELECT cell.room_id
            FROM public.cell
           WHERE (cell.user_id = new_update.g)));
 UPDATE public.cell SET status = 2
   WHERE (cell.room_id IN ( SELECT cell_1.room_id
            FROM public.cell cell_1
           WHERE ((cell_1.status = 0) AND (cell_1.user_id <> new_update.g))));
END;
 {   DROP PROCEDURE public.new_update(IN a date, IN b date, IN c integer, IN d integer, IN e integer, IN f integer, IN g uuid);
       public          postgres    false    220    217    217    217    217    216    216    217    220    220    217    217            �            1259    16443    metting_room    TABLE       CREATE TABLE public.metting_room (
    "ID" uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    photo character varying NOT NULL,
    status smallint,
    descripe character varying NOT NULL,
    price integer NOT NULL,
    rating smallint
);
     DROP TABLE public.metting_room;
       public         heap    postgres    false            �            1259    24734    order    TABLE     �   CREATE TABLE public."order" (
    "ID" uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    "Service_ID" uuid NOT NULL,
    amount integer DEFAULT 1 NOT NULL
);
    DROP TABLE public."order";
       public         heap    postgres    false            �            1259    24751 	   resturant    TABLE       CREATE TABLE public.resturant (
    "ID" uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    photo character varying NOT NULL,
    description character varying NOT NULL,
    resturant_type_id uuid NOT NULL,
    price integer NOT NULL
);
    DROP TABLE public.resturant;
       public         heap    postgres    false            �            1259    24779    resturant_type    TABLE     ~   CREATE TABLE public.resturant_type (
    "ID" uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL
);
 "   DROP TABLE public.resturant_type;
       public         heap    postgres    false            �            1259    16405 	   room_type    TABLE     �   CREATE TABLE public.room_type (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    photo character varying(250),
    nameroom character varying(20)
);
    DROP TABLE public.room_type;
       public         heap    postgres    false            �            1259    16451    services    TABLE       CREATE TABLE public.services (
    "ID" uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    photo character varying NOT NULL,
    start_in time without time zone NOT NULL,
    end_in time without time zone NOT NULL,
    price integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.services;
       public         heap    postgres    false            �            1259    16399    users    TABLE       CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    firstname character varying(30),
    lastname character varying(30),
    email character varying(100),
    password character varying(100),
    phone integer,
    roles smallint DEFAULT 0
);
    DROP TABLE public.users;
       public         heap    postgres    false            O          0    16424    booking 
   TABLE DATA           |   COPY public.booking (id, numberchild, numberadult, bookingcheckin, bookingcheckout, total, paymenttype, userid) FROM stdin;
    public          postgres    false    217   �7       R          0    24667    cell 
   TABLE DATA           <   COPY public.cell (id, user_id, room_id, status) FROM stdin;
    public          postgres    false    220   *8       P          0    16443    metting_room 
   TABLE DATA           Z   COPY public.metting_room ("ID", name, photo, status, descripe, price, rating) FROM stdin;
    public          postgres    false    218   �9       S          0    24734    order 
   TABLE DATA           F   COPY public."order" ("ID", user_id, "Service_ID", amount) FROM stdin;
    public          postgres    false    221   �<       T          0    24751 	   resturant 
   TABLE DATA           ]   COPY public.resturant ("ID", name, photo, description, resturant_type_id, price) FROM stdin;
    public          postgres    false    222   �<       U          0    24779    resturant_type 
   TABLE DATA           4   COPY public.resturant_type ("ID", name) FROM stdin;
    public          postgres    false    223   iB       N          0    16409    room 
   TABLE DATA              COPY public.room (id, roomnumber, petfrindly, roomdescripe, roomtypeid, roomcoast, roomstate, photo, smokefrindly) FROM stdin;
    public          postgres    false    216   �B       M          0    16405 	   room_type 
   TABLE DATA           8   COPY public.room_type (id, photo, nameroom) FROM stdin;
    public          postgres    false    215   �J       Q          0    16451    services 
   TABLE DATA           N   COPY public.services ("ID", name, photo, start_in, end_in, price) FROM stdin;
    public          postgres    false    219   �L       L          0    16399    users 
   TABLE DATA           W   COPY public.users (id, firstname, lastname, email, password, phone, roles) FROM stdin;
    public          postgres    false    214   �N       �           2606    16429    booking booking_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.booking DROP CONSTRAINT booking_pkey;
       public            postgres    false    217            �           2606    24672    cell cell_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.cell
    ADD CONSTRAINT cell_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.cell DROP CONSTRAINT cell_pkey;
       public            postgres    false    220            �           2606    16450    metting_room metting_room_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.metting_room
    ADD CONSTRAINT metting_room_pkey PRIMARY KEY ("ID");
 H   ALTER TABLE ONLY public.metting_room DROP CONSTRAINT metting_room_pkey;
       public            postgres    false    218            �           2606    24739    order order_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY ("ID");
 <   ALTER TABLE ONLY public."order" DROP CONSTRAINT order_pkey;
       public            postgres    false    221            �           2606    24758    resturant resturant_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.resturant
    ADD CONSTRAINT resturant_pkey PRIMARY KEY ("ID");
 B   ALTER TABLE ONLY public.resturant DROP CONSTRAINT resturant_pkey;
       public            postgres    false    222            �           2606    24786 "   resturant_type resturant_type_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.resturant_type
    ADD CONSTRAINT resturant_type_pkey PRIMARY KEY ("ID");
 L   ALTER TABLE ONLY public.resturant_type DROP CONSTRAINT resturant_type_pkey;
       public            postgres    false    223            �           2606    16416    room room_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.room DROP CONSTRAINT room_pkey;
       public            postgres    false    216            �           2606    16418    room_type room_type_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.room_type
    ADD CONSTRAINT room_type_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.room_type DROP CONSTRAINT room_type_pkey;
       public            postgres    false    215            �           2606    16458    services services_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY ("ID");
 @   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pkey;
       public            postgres    false    219            �           2606    24724    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    214            �           2606    16403    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            �           2606    16430    booking booking_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE RESTRICT NOT VALID;
 E   ALTER TABLE ONLY public.booking DROP CONSTRAINT booking_userid_fkey;
       public          postgres    false    214    3492    217            �           2606    24680    cell cell_room_ID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cell
    ADD CONSTRAINT "cell_room_ID_fkey" FOREIGN KEY (room_id) REFERENCES public.room(id) NOT VALID;
 B   ALTER TABLE ONLY public.cell DROP CONSTRAINT "cell_room_ID_fkey";
       public          postgres    false    3496    220    216            �           2606    24675    cell cell_user_ID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cell
    ADD CONSTRAINT "cell_user_ID_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 B   ALTER TABLE ONLY public.cell DROP CONSTRAINT "cell_user_ID_fkey";
       public          postgres    false    220    3492    214            �           2606    24740    order order_Service_ID_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "order_Service_ID_fkey" FOREIGN KEY ("Service_ID") REFERENCES public.services("ID") NOT VALID;
 I   ALTER TABLE ONLY public."order" DROP CONSTRAINT "order_Service_ID_fkey";
       public          postgres    false    221    3502    219            �           2606    24745    order order_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 D   ALTER TABLE ONLY public."order" DROP CONSTRAINT order_user_id_fkey;
       public          postgres    false    214    3492    221            �           2606    24787 *   resturant resturant_resturant_type_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.resturant
    ADD CONSTRAINT resturant_resturant_type_id_fkey FOREIGN KEY (resturant_type_id) REFERENCES public.resturant_type("ID") NOT VALID;
 T   ALTER TABLE ONLY public.resturant DROP CONSTRAINT resturant_resturant_type_id_fkey;
       public          postgres    false    223    222    3510            �           2606    16419    room room_roomtypeid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_roomtypeid_fkey FOREIGN KEY (roomtypeid) REFERENCES public.room_type(id) NOT VALID;
 C   ALTER TABLE ONLY public.room DROP CONSTRAINT room_roomtypeid_fkey;
       public          postgres    false    215    3494    216            O   Z   x�=ɱ�0�Z�僧H��.ih���Jw��=�ȭ��]!�)!�o�:Ѥ�684P�6%��u.�N�g��Wp��(�G|f�~z�zM�      R   c  x����u1D�}��#�' D�%��
6S0�2�P�Q��K�kM��U籃�?����C��hAD�T�!��SyYa�8�D*� �]y��y�3�rN�@�X\�q J;����;�.��Ph���l��L�#�����I���@�	:��nrS�j����N�8�Uhօ�f�ؙ%��s/�6���̐��m�=]��%N<���&�7��r�[���; m�ʾ���|�bj��Z���^.E���;���OYp\� �T��;fMGߪ���y����c�5̞BL�<�T	l;>m3�Lͷ��Շ�8��[��s������ֻHǖ��
qgou����m�=���?����=�k      P   �  x����n�F��姘��0iD�lai���hQr3��k���$1Wy��^�����*H 
��s��o�6��E�'��D2��H�LP�Ջy�f�n�$�Jo�Oc�Y����|{�ܒK�v�]�
3��;�M�WuqW�E�7�"��"�S����ԫ�޶�<���Z���_��i������[�|<}^��?]�ԧ�Cф��4�W���������C[�5������x�gYv���f��}�Уem�@ڃۣ @M�S@K0�'�C9@�6�B؃7Pg�'��).�[�To��vPK@eGFoȒ�S��G*I�O5/5ܔ���Xze4�88R�Ƿ3Bq¤��*z�ߝ�����ꀞ`�V�N���%��)4�~6#$�m��ֶ��O��a�Σ�Y��J+�y�\�kM�ҁ�L_�	֏܈��H���A��%��dR�Bm��7���RtM��ޢ��@_� �4P:�ۛUW�l�)��w2'l����"���r,i�")c�#��w�8/�*�|^�l�h���3&������|����-Wl$�S#�ɫ>�g#�u&�Z&��Ŗ-6�n��)�E����9���Hi�] �M0;[Cg�~��q�6���6��ΛA}�z|U��� ��	<�U�w��D;�g�.s�l~����d����Ϸ.���G�L��i�Ɋz�#e���<y�4�šWoI;�`/Jٝ~��Մ������?���      S      x������ � �      T   �  x��Vێ5}��
�@�x��HZ�E<D�$B��.O��nwl�.���e���FAhg�[_�r���s���m��g%/�:�M�I�֢� D2ټY���Ӿgx8�M���^^]�Z�{'p�z/�x�ݕ�W��f�A�+Z�G1���#Ȟߦ/gk�"<�$Z.��x3}��&k_��_e�B���Qjs��3�$�8h���3�Ȍb�#�x4�%S��b��[d�{��b�Ӈ	�b�u�F��L;�Ky�k��C�>,0hwe��0e��ÑupC����v=��-ޣ��ZG�ŜD��N1�O;�G�ZP^�Gt�g?ҕ�����efް�M���X�n���lڶ�IU�(2�m�%<i�T6%�R��4���h��WU�򢒒C+2�)�&�2�y�G�|���t�5��w<0�lb	 a&��w��x�� ��~��c�=1	shoiY��"����W*�5�1B��sE����~=bE����R���ů~�,V�����!U]�Îe-x���X�m֩d���Ys7]DS���6A(#>���=278I�(b�ӻ�/��Q�l��eTZa�3�O�\Dύ��>��bh"]�ІWa�I�G����]h����C�v�h�����t�m3�i�<�iqQ$�r��U��B�]��k9}���K��'�VB�~����hqd�Ƶ�V������J GR�o�%	�P�?��=k�5�r0� �8�hW�=�u�Lb5��g�t��45�ݠ�2度�+OM�H���I�������"
P�T�e�3����u)�jSnU�j�{*����P�j��e]w�o��Ĕ>�7 .�J�ݼ��K �=^������c1�����3H��*���C@�ee0|6'�W�V2(�-Z�V�Ŝ4ۡ���|�}�c��`�� Z����6i^�2�"5*��I2�$P����z&M�劗 a���g��/���opz�aA$�e\�(��k�Pǘ?�,M�/Yt}�!x��,1���>pf3��.������F
�z�i�J�\u\ �P��m�<�Z(��
�UFR�����V��j.K�!QmY��F�� ��(��3ѻ���od1^UO�6(#N>@摈�}s��۳�[���# �H�HP�!�����[�b]�2��$����"�Ӷ+�ں��e���'q���y���jpg�d4\��A�VUBα�kNK��o��*eWE����o���DΆ-����C���و��{G��6��r�՛�Nt0�����G6��q�[eқ�	������'�p4�����3��@O4�z�ˬV�̸]p��&�LʢRvY��&(�{��x	��AB�?���a|h�Gf?��S�B�\[��nq���(�ì�?r%C?ӿ�yv,{�sea�\O�")���uT#����8A���o��v�����      U   x   x��1B! ��RS�z'W�B����c������y�t�N������s��b����:�x/�ł U�@�FP�(#7�t�����:X�y����Z�޵����{���?.9��f%      N   �  x��Xےܶ}��
<�d�b�+/�R�d�,+�b�"%)Um�@cH/��rgG��|B�,MΌvW�9�*g_vv8�8�����Fg�Rn��J
As@�q�Hp��|��\�Ž����C���-y�R��!E�Uu�Z�n_Tu$6���7{hù��:�غ����X�4.��ГM=Tď}[�
�(McC����L�%�5l�I�Ć'�{\�u�P�v���ȫ���c�g�4��7����&B��?���}�B7�����0��7#�:�~��-.5�k�5���:̊S�.8��1�[�݅�̑�c��@Wa���7f ���z/^�FDĪ�Y��ʴ-4q��a&g�Z�3�X�h�ˌB*�e��Y�"Ol��0t�v��aY���]"I�׫�t��b�g���/��.V�[�A�W-ED)nh��vEq����q��`�LE�)WT��SN���I���[-�>;b��DNK��*CFe������g�п�rޡ|].��IH$!;)]J���9٫&x2T0/�2aO�ٚw�a�C0@>��ژ~������?�W�������+�����tLPg�dbӄ���(�>��G|,�j�8j�^;�ބ�C�͎�X)���$�/���º��B9��Y���'	#j��}�u�/�zФb�!&���\�S.�Ȓ5��$�'�TP�Q�3��d�.�w*��VjHK�V��*�Jj�L��
Y�e�Ԃ�w��D@�	v�fhgmD�P�At��
͌De�5�����pw\�-�4�+���}�W���ZHS��c��A�B�]k!FrL~�Xzx��u-Z��^P�rd\IM�-U�@Y#��B\�HH�%:���0�ѓ����������Ӆ�z+e��16K��}��`Tc�U�YR�5$�Г�������E���,���냓#Q*��4�2��%7�0�Ӕ[��ԥL�>������`�7����l���������GH��k�q��n ���a��6�m��i��)c�Ч6�������Q����"�E��q����J��}�B����n���{R�djY�y"�Xe�&�w?=�Y��Z�RԋI�DJs_dT;�[����H�)����V�__nS��V�[A��Jf�r{�����=(�0y�)�����"ihZf�s���4h�wRh�E����V}���}X!�ElC�<�cf1Q�fn&.ߦ3Zh!���c�"�9E�L=�-�ɵ���X�K��sɿ1�/`����sv�ȶ*�i]ֵ�xj�;�xR[Z�L*�k�i�B�@H�i��N��}�~@������� ����t�Ǡ�_SR���dI��&u�������i�"�� �]��&$Vf�� �������0�Sj�*lP��v���U�j�f�{Ѯ�5H�zEQ'.��f�Vg���?\[̎�!���ҫ���B�,� �#�G�-E�bmb��Bg4�)�f�2'삳� ��=y2%󤍓q�!x?U��~J��dE~l�D�i�q�� o$v�2��H=�2���a��5v����23������ �Rs9[S�O�L���Q*�Y�f�������7��%�/�[�c�up�Dc��po��p���͈h�����c���a���Ŋ���Н�����].�R��e)��޳���I�s�Yn�]��}���vht([�\!�Cmg�w���r��SW<�'�?�鳿|W�|�'�p�>aߟ�3m���sڄ�x�`8�{�W�_�����/�ӓ�x�߳��?��Mw���?ύ�<�de>���P��"�}اCV7W�7V�Y�Np2��s���Mi~6wk?$bj���o,�r���}��N�k���t����S�<f�z+����h^��y���O�C���_���~b����/JpvY��[��y�p���.2œ�X%�3�:�gmشt���7=L�������d���GGG��Q��      M     x����r�0 ��kx���@�dK�k7,1[`:�H��%F2^��ӗ4��7����9P0�P 
�p[R;8���!�� m���2�=J�I����*4��u3
�i<E�r��I!^���0^^'��T������=�������d���}��Y-��`f7UZ���4�dx��E�Ӆ�>U��vjM�6�;w5�����ҖJe�H<�8e���2�4$D	A0�L�a� �6gȊF�_6���+'5�V�����2߶�xҳ���&�npzX���`��,�����ˀPY�:�s??&4[jdE��m@���_���7y_�=J��՛9��e>:��}_�ߎ���Vg�j��Ĵ��?m6f��H��MD��ā1	��m�nT��%����ôNM��֕��tܖ�Q=� �c�ƍ��uv*k����Ek�*ټ�V�e!�0�z-2��d���m���G�X:@و� G�̦!
���_uB�,uY���	:��Y������g[�5q=�>�? 2��M      Q   �  x���]k�0����;ْ�/�K�d)�-[Y�`(��;�#�M�_?e��.6Hp��y��ne�
MC�ڀr#��|��@ٲ�i�\����0+���N�.�^5C��>W��p�@%� d��/Tm��c���mA}�vt֤�թ%،�1]��j��.0���:�ݰ}��S���N�9�S5�£��?����z.�X}zXv7������{,׮<�w����d�p$��HK@��@@FUDr(�J$��M�r�����e&�\u��'Ӷ��{6
Vja(���W�([Ba!*�UŐ���FӂdU_�e���^��)���J��Hb5'�s���dײӣ?�_(���P�)Հ��B0�y� ��bH��[�d�hk@\�w	;�w�🴕c���߁������������ru����n�ǯ��W�>҅e���Z�-04��O&��[j�      L   �  x�u�[������߱n�IHHr�=�q<+�IH"�(�x��_�Y������jU������ PB��Wb�JA�(�,e��]����?��y&���s�n�x�� ��>|��JsX@lI��6�ž�L��X�	�㡿����/}�,�a�.���q�Ɨ c���N/��i:[�*$>N>Y($=�4'�!ˀ�� �)�w+�9��^l$�D�@��k���c�L��JyFIzKM+;�����7�����p���zn�����!F�0*0 
A �� �#XaK���~�F�E=��z�G��M��dp4O�`�g�/�"��G]����*�����$!C�m����R�[�}�ϟ%ѹ��	f����MHc��Iu~�����ޢ�ˋ�k����� �i@�tP��c����$p8J%KR��gؿf��)j>.���Y����Aq�[��v�:�K����V�^���E��<�*�]����;���X� �V" 
�ؽ�rR��\���	a��eܿ��8��Cy4>�k��n�8���42#=j��%����)��Ϫs9ԱI�ޠ���q !��b��Q��a�i��G+ͽ��t��u��LE��a?;4��n���v[�~a3�=1�X�A���rA	� b�P���*��Y��w �~e�4�'p��o]v�W�h<�
�:��d���}xZ��-EQ��W����I���w^�b� ��ښ���aZ[�J'y���R�O'��e�W���;�^�Ui�-���{��6���7O�|�ϑ^>�(���(��Q��p���;�O(���6
&�`	��	kJ��9\?������f����=L+�^G,6֛��ސ�u�>m��
1_M�i��Qm��S6�w���XF(��p)�yi84NDi]�Y�L��K����s��z[�X�j�]#���h~µ��i?K��1�XI:��}�
)�r��w�Z���O���fHqGCD@$�Jk����������+Kcu��ם��)��9/�:�m�0��zR��q���k�z,x6`�ް�8;Jw<�3����_J��B��O�Xr_#c9��~��ap�ҍJb�'�ه]�E�jREٞ�Ţ?�y"J�\�z���3g���2.�uk�>Ԯ�	7M|L��R�p��ܴ#���0
�v~3-5V�CK2��2r��^�5PS]�N�����KBn��7���e��Mj��gݮ�y����Þ���_��5����5rS�������L������������z��f��?"�ʎq.�&��;ޥۛ�(�!�M����qP�l����_�L*5@�O9��v1����� ���m����aÝn���=�z�5�&���W�Grhg�{�x��F��'�.p�=?�xooo�����     